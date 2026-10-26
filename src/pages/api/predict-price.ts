import type { APIRoute } from 'astro';
import { predictFairPrice, type PricePredictionInput } from '../../lib/ml/price-predictor';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: PricePredictionInput = await request.json();

    if (!body.craft_category || body.labour_days === undefined || body.raw_material_cost === undefined) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: craft_category, labour_days, raw_material_cost' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const prediction = predictFairPrice({
      craft_category: body.craft_category,
      region: body.region || 'Bastar_CG',
      labour_days: Number(body.labour_days),
      raw_material_cost: Number(body.raw_material_cost),
      complexity_score: Number(body.complexity_score || 7),
      season_multiplier: Number(body.season_multiplier || 1.0)
    });

    return new Response(JSON.stringify(prediction), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error in price prediction' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
