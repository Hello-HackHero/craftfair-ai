import type { APIRoute } from 'astro';
import weightsData from '../../data/trained_weights.json' with { type: 'json' };

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(weightsData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
