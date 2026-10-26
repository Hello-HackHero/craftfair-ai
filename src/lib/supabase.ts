import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import localCatalogSeed from '../data/local_catalog.json';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || '';

const isRealSupabase =
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 30 &&
  !supabaseAnonKey.includes('your-supabase');

export const supabase = isRealSupabase
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local fallback persistence with Vercel serverless /tmp support
const writableDataPath = process.env.VERCEL 
  ? path.join('/tmp', 'craftfair_catalog.json') 
  : path.resolve(process.cwd(), 'src/data/local_catalog.json');

// In-memory catalog cache for instant serverless reads & writes
let memoryCatalog: any[] | null = null;

function loadInitialSeedData(): any[] {
  if (memoryCatalog !== null) return memoryCatalog;

  // 1. Check if writable /tmp file exists (populated in current container)
  try {
    if (fs.existsSync(writableDataPath)) {
      const content = fs.readFileSync(writableDataPath, 'utf8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCatalog = parsed;
        return memoryCatalog!;
      }
    }
  } catch (_) {}

  // 2. Fall back to bundled static seed data
  if (Array.isArray(localCatalogSeed) && localCatalogSeed.length > 0) {
    memoryCatalog = [...localCatalogSeed];
    try {
      fs.writeFileSync(writableDataPath, JSON.stringify(memoryCatalog, null, 2), 'utf8');
    } catch (_) {}
    return memoryCatalog!;
  }

  memoryCatalog = [];
  return memoryCatalog;
}

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
      console.warn('Supabase query notice, using local storage fallback:', e);
    }
  }

  return loadInitialSeedData();
}

export async function saveCatalogListing(listing: any) {
  // If image_url is a massive base64 string, omit from disk store to preserve space
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
      if (!error && data && data.length > 0) {
        return { success: true, data: data[0], storage: 'supabase' };
      }
    } catch (e) {
      console.warn('Supabase insert failed, saving to serverless storage:', e);
    }
  }

  // Update in-memory cache
  const list = loadInitialSeedData();
  list.unshift(newRecord);
  memoryCatalog = list;

  // Persist to writable storage (/tmp on Vercel)
  try {
    fs.writeFileSync(writableDataPath, JSON.stringify(list, null, 2), 'utf8');
    return { success: true, data: newRecord, storage: 'serverless_storage' };
  } catch (err) {
    console.warn('Filesystem write notice, in-memory updated:', err);
    // Even if disk write fails, in-memory cache succeeded
    return { success: true, data: newRecord, storage: 'memory_cache' };
  }
}
