import type { IncomingMessage, ServerResponse } from 'node:http';
import { processQuoteSubmission } from '../lib/quoteMailer.ts';

interface ServerlessRequest extends IncomingMessage {
  body?: unknown;
}

interface ServerlessResponse extends ServerResponse {
  status?: (code: number) => ServerlessResponse;
  json?: (payload: unknown) => void;
}

const MAX_BODY_BYTES = 32 * 1024;

async function readJsonBody(req: ServerlessRequest): Promise<unknown> {
  if (req.body !== undefined) {
    if (typeof req.body === 'string') {
      return JSON.parse(req.body);
    }
    return req.body;
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let totalBytes = 0;

    req.on('data', (chunk: Buffer) => {
      totalBytes += chunk.length;
      if (totalBytes > MAX_BODY_BYTES) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', reject);
  });
}

function sendJson(res: ServerlessResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { ok: false, error: 'Method not allowed.' });
    return;
  }

  let parsedBody: unknown;
  try {
    parsedBody = await readJsonBody(req);
  } catch (err) {
    const message = err instanceof Error && err.message === 'Payload too large'
      ? 'Request payload exceeds size limit.'
      : 'Invalid JSON request body.';
    sendJson(res, 400, { ok: false, error: message });
    return;
  }

  const forwardedFor = req.headers['x-forwarded-for'];
  const clientIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : typeof forwardedFor === 'string'
      ? forwardedFor.split(',')[0].trim()
      : req.socket.remoteAddress || 'unknown';

  const result = await processQuoteSubmission(parsedBody, clientIp);
  if (!result.ok) {
    sendJson(res, result.status, { ok: false, error: result.error });
    return;
  }

  sendJson(res, 200, {
    ok: true,
    id: result.id,
    message: result.message,
  });
}
