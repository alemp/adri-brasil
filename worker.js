// Cloudflare Worker: serves the built site from dist/ and routes the booking form to the Pages-style function.
import { onRequestPost } from './functions/api/contact.js';

export default {
  fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contact') {
      return request.method === 'POST' ? onRequestPost({ request, env }) : new Response('Method not allowed', { status: 405 });
    }
    return env.ASSETS.fetch(request);
  },
};
