import { Resend } from 'resend';

export const QUOTE_RECIPIENT_EMAIL = 'info@usizolethu.co.za';

export interface QuoteSubmissionPayload {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  details: string;
}

export interface QuoteMailResult {
  ok: boolean;
  status: number;
  message?: string;
  error?: string;
  id?: string;
}

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const ipRequestLog = new Map<string, number[]>();

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const recent = (ipRequestLog.get(clientKey) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS,
  );

  if (recent.length >= RATE_MAX_REQUESTS) {
    ipRequestLog.set(clientKey, recent);
    return true;
  }

  recent.push(now);
  ipRequestLog.set(clientKey, recent);

  // Prevent unbounded growth across long-lived server processes
  if (ipRequestLog.size > 500) {
    for (const [key, timestamps] of ipRequestLog.entries()) {
      if (timestamps.every((t) => now - t >= RATE_WINDOW_MS)) {
        ipRequestLog.delete(key);
      }
    }
  }

  return false;
}

function stripHeaderBreaks(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validateAndNormalize(
  raw: unknown,
): { valid: true; data: QuoteSubmissionPayload } | { valid: false; error: string } {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { valid: false, error: 'Invalid request payload.' };
  }

  const record = raw as Record<string, unknown>;
  const asCleanString = (val: unknown) => (typeof val === 'string' ? val.trim() : '');

  const fullName = stripHeaderBreaks(asCleanString(record.fullName));
  const company = stripHeaderBreaks(asCleanString(record.company));
  const email = stripHeaderBreaks(asCleanString(record.email));
  const phone = stripHeaderBreaks(asCleanString(record.phone));
  const service = stripHeaderBreaks(asCleanString(record.service));
  const details = asCleanString(record.details);

  if (!fullName || fullName.length > 120) {
    return { valid: false, error: 'Please enter a valid full name (max 120 characters).' };
  }

  if (company.length > 150) {
    return { valid: false, error: 'Organization name must be 150 characters or fewer.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.length > 254 || !emailRegex.test(email)) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }

  const phoneDigits = phone.replace(/\D/g, '');
  if (!phone || phone.length > 40 || phoneDigits.length < 9) {
    return { valid: false, error: 'Please provide a valid contact number.' };
  }

  if (!service || service.length > 160) {
    return { valid: false, error: 'Please select a valid supply or service category.' };
  }

  if (details.length < 10 || details.length > 4000) {
    return {
      valid: false,
      error: 'Please provide project specifications between 10 and 4000 characters.',
    };
  }

  return {
    valid: true,
    data: { fullName, company, email, phone, service, details },
  };
}

export async function processQuoteSubmission(
  rawBody: unknown,
  clientIp: string,
): Promise<QuoteMailResult> {
  if (isRateLimited(clientIp || 'unknown')) {
    return {
      ok: false,
      status: 429,
      error: 'Too many quote requests sent from this connection. Please wait a few minutes and try again.',
    };
  }

  const parsed = validateAndNormalize(rawBody);
  if (!parsed.valid) {
    return { ok: false, status: 400, error: parsed.error };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error:
        'Email delivery service is not configured yet (RESEND_API_KEY missing). Please contact info@usizolethu.co.za directly.',
    };
  }

  const { fullName, company, email, phone, service, details } = parsed.data;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() || 'Usizolethu Technologies <onboarding@resend.dev>';

  const safeFullName = escapeHtml(fullName);
  const safeCompany = escapeHtml(company || 'Individual / Not specified');
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeService = escapeHtml(service);
  const safeDetailsHtml = escapeHtml(details).replace(/\n/g, '<br />');

  const subject = `Quote Request: ${service} — ${company || fullName}`;
  const textBody = [
    'New Quote & Specification Request — Usizolethu Technologies',
    '============================================================',
    `Full Name: ${fullName}`,
    `Organization: ${company || 'Individual / Not specified'}`,
    `Email: ${email}`,
    `Telephone: ${phone}`,
    `Service Category: ${service}`,
    '',
    'Specifications & Scope:',
    details,
  ].join('\n');

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #141414; color: #f5f5f5; padding: 32px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border: 1px solid #2e2e2e; border-top: 3px solid #9adbe8; padding: 28px;">
        <p style="margin: 0 0 8px; font-size: 12px; color: #9adbe8; letter-spacing: 0.04em;">USIZOLETHU TECHNOLOGIES (PTY) LTD</p>
        <h1 style="margin: 0 0 20px; font-size: 20px; font-weight: 500; color: #ffffff;">New Quote &amp; Specification Enquiry</h1>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #a3a3a3; width: 160px; border-bottom: 1px solid #2a2a2a;">Full Name</td>
            <td style="padding: 8px 0; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${safeFullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a3a3a3; border-bottom: 1px solid #2a2a2a;">Organization</td>
            <td style="padding: 8px 0; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${safeCompany}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a3a3a3; border-bottom: 1px solid #2a2a2a;">Email</td>
            <td style="padding: 8px 0; color: #9adbe8; border-bottom: 1px solid #2a2a2a;">${safeEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a3a3a3; border-bottom: 1px solid #2a2a2a;">Telephone</td>
            <td style="padding: 8px 0; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a3a3a3; border-bottom: 1px solid #2a2a2a;">Service Category</td>
            <td style="padding: 8px 0; color: #9adbe8; border-bottom: 1px solid #2a2a2a;">${safeService}</td>
          </tr>
        </table>
        <p style="margin: 0 0 8px; font-size: 12px; color: #a3a3a3;">Project Specifications &amp; Delivery Location</p>
        <div style="padding: 14px; background-color: #141414; border: 1px solid #2a2a2a; font-size: 14px; line-height: 1.6; color: #e5e5e5;">
          ${safeDetailsHtml}
        </div>
      </div>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [QUOTE_RECIPIENT_EMAIL],
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend API error:', error.message);
      return {
        ok: false,
        status: 502,
        error: 'Unable to dispatch email via Resend right now. Please try again or email info@usizolethu.co.za.',
      };
    }

    return {
      ok: true,
      status: 200,
      id: data?.id,
      message: `Your quote request has been delivered to ${QUOTE_RECIPIENT_EMAIL}.`,
    };
  } catch (err) {
    console.error('Resend unexpected failure:', err instanceof Error ? err.message : 'Unknown error');
    return {
      ok: false,
      status: 502,
      error: 'An unexpected error occurred while sending your request. Please try again shortly.',
    };
  }
}
