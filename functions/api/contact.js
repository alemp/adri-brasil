// Cloudflare Pages Function: POST /api/contact
export async function onRequestPost({ request, env }) {
  const f = await request.formData();
  if (f.get('website')) return new Response('ok'); // honeypot: bots fill this in

  const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: f.get('cf-turnstile-response') || '' }),
  });
  if (!(await check.json()).success) return new Response('spam check failed', { status: 400 });

  const esc = (s) => String(s || '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM, to: env.CONTACT_TO, reply_to: f.get('email'),
      subject: `Booking request from ${esc(f.get('name'))}`,
      html: `<p><b>${esc(f.get('name'))}</b> (${esc(f.get('email'))})</p><p><b>${esc(f.get('type'))}</b></p><p>${esc(f.get('message'))}</p>`,
    }),
  });
  return new Response(res.ok ? 'ok' : 'send failed', { status: res.ok ? 200 : 502 });
}
