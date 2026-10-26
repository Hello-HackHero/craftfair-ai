import type { APIRoute } from 'astro';
import { transcribeAudio, processVoiceInput } from '../../lib/ml/voice-processor';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';

    // Mode 1: Client sends text transcript (Web Speech API)
    if (contentType.includes('application/json')) {
      const body = await request.json();
      const rawText = body.transcript || '';
      const result = await processVoiceInput(rawText);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Mode 2: Client uploads audio blob
    const audioBuffer = Buffer.from(await request.arrayBuffer());
    const mimeType = contentType.split(';')[0] || 'audio/webm';

    const rawTranscript = await transcribeAudio(audioBuffer, mimeType);
    const result = await processVoiceInput(rawTranscript);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Error processing speech transcription' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
