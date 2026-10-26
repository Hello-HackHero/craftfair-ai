import type { APIRoute } from 'astro';
import { classifyCraftImage } from '../../lib/ml/craft-classifier';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const imageBase64 = body.image || '';
    const fileName = body.fileName || '';
    const promptText = body.promptText || body.notes || '';
    const visualTone = body.visualTone || '';

    const classification = await classifyCraftImage(imageBase64, fileName, promptText, visualTone);

    return new Response(JSON.stringify(classification), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Error classifying craft image' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
