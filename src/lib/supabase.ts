import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || '';

const isRealSupabase =
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 30 &&
  !supabaseAnonKey.includes('your-supabase');

export const supabase = isRealSupabase
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local fallback persistence
const localDataPath = path.resolve(process.cwd(), 'src/data/local_catalog.json');

export async function getCatalogListings() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('digital_catalog')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Supabase query failed, using local storage fallback:', e);
    }
  }

  try {
    if (fs.existsSync(localDataPath)) {
      const content = fs.readFileSync(localDataPath, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading local catalog fallback:', err);
  }

  return [];
}

export async function saveCatalogListing(listing: any) {
  // If image_url is a massive base64 string, don't bloat local storage
  let safeImageUrl = listing.image_url || '';
  if (safeImageUrl.startsWith('data:image')) {
    safeImageUrl = ''; // Omit multi-MB base64 from disk store
  }

  const newRecord = {
    ...listing,
    image_url: safeImageUrl,
    id: listing.id || `item-${Date.now()}`,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('digital_catalog')
        .insert([newRecord])
        .select();
      if (!error && data) {
        return { success: true, data: data[0], storage: 'supabase' };
      }
    } catch (e) {
      console.warn('Supabase insert failed, saving to local JSON storage:', e);
    }
  }

  // Save to local JSON store
  try {
    let currentList = [];
    if (fs.existsSync(localDataPath)) {
      currentList = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
    }
    currentList.unshift(newRecord);
    fs.writeFileSync(localDataPath, JSON.stringify(currentList, null, 2), 'utf8');
    return { success: true, data: newRecord, storage: 'local_storage' };
  } catch (err) {
    console.error('Error saving to local storage:', err);
    return { success: false, error: String(err) };
  }
}
