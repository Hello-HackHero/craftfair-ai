import type { APIRoute } from 'astro';
import { getCatalogListings, saveCatalogListing } from '../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const listings = await getCatalogListings();
    return new Response(JSON.stringify(listings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Error fetching catalog' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const result = await saveCatalogListing(body);
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Error saving listing' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
