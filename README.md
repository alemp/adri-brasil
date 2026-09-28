# Adri Brasil website (starter)

Astro static site + Sanity CMS + Cloudflare Pages. Adri edits in Sanity Studio; each Publish rebuilds the site.

## Included
- `/en /de /pt` home page and events page (upcoming and past, sorted by date)
- Booking form -> `functions/api/contact.js` (Turnstile spam check + Resend email)
- Sanity schemas: event, series, artist, curriculum level, site settings (text stored per language)
- Nightly rebuild (GitHub Action) so events move to "past"

## Not included yet
Workshops (curriculum accordion), DJ, Production and About pages, Impressum/Datenschutz text, the festive design
from the homepage mockup, video click-to-load component.

## Setup
1. **Sanity:** create a project at sanity.io/manage. In `studio/`: `npm i`, put the project ID in `studio/.env` as
   `SANITY_STUDIO_PROJECT_ID=...`, run `npm run dev` and add a test event. `npm run deploy` gives Adri his login URL.
2. **Site:** `cp .env.example .env`, fill `SANITY_PROJECT_ID`, then `npm i && npm run dev`.
3. **Cloudflare Pages:** connect the GitHub repo. Build command `npm run build`, output `dist`. Add the env vars from
   `.env.example`. Create a Turnstile widget and a Resend API key (verify your sending domain).
4. **Auto-publish:** create a Deploy Hook in Pages, then add a Sanity webhook (Manage > API > Webhooks) calling it on
   create/update/delete. Also save it as GitHub secret `CF_DEPLOY_HOOK` for the nightly rebuild.
5. **Domain:** add a custom domain in Pages. Write the Impressum before launch (required in Germany).

## Note
Not yet run against a live Sanity project, so expect small fixes on first run.
