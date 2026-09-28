# Adri Brasil website

Astro static site + Sanity CMS, deployed as a Cloudflare Worker (static assets). Adri edits in Sanity Studio; each
Publish rebuilds the site.

## Included
- `/en /de /pt` home page (events, services, workshop curriculum, DJ gear, about, artists, contact) and events page
- Contact via email and Instagram links (from Site settings in Sanity)
- Impressum and Datenschutz pages; owner details in `src/lib/legal.js`
- Sanity schemas: event, series, artist, curriculum level, site settings (text stored per language)
- `studio/seed.ndjson`: initial content from the old Google Sites page
- Nightly rebuild (GitHub Action) so events move to "past"

## Setup
1. **Sanity:** in `studio/`: `npm i`, put the project ID in `studio/.env` as `SANITY_STUDIO_PROJECT_ID=...`, then
   `npm run dev`. Load content with `npx sanity dataset import seed.ndjson production --replace`.
   `npm run deploy` gives Adri his Studio URL. The `production` dataset must be public.
2. **Site:** `cp .env.example .env`, fill `SANITY_PROJECT_ID`, then `npm i && npm run dev`.
3. **Cloudflare:** Workers project connected to this repo. Build command `npm run build`, deploy command
   `npx wrangler deploy` (config in `wrangler.jsonc`). Build variables from `.env.example`.
4. **Auto-publish:** create a Deploy Hook in Cloudflare, add it as a Sanity webhook (API > Webhooks) on
   create/update/delete, and as GitHub secret `CF_DEPLOY_HOOK` for the nightly rebuild.
5. **Before launch:** fill in the real name and address in `src/lib/legal.js`.
