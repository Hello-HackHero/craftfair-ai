import type { APIRoute } from 'astro';
import { generateProductListing, type ListingGenerationInput } from '../../lib/ml/listing-generator';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: ListingGenerationInput = await request.json();

    if (!body.craft_category || !body.fair_price) {
      return new Response(
        JSON.stringify({ error: 'Missing required craft_category or fair_price' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const listing = await generateProductListing(body);

    return new Response(JSON.stringify(listing), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Error generating product listing' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
