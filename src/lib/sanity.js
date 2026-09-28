import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanity = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
});
const builder = imageUrlBuilder(sanity);
export const img = (src, w = 1200) => builder.image(src).width(w).auto('format').url();
// Localized field helper: falls back to English when a translation is empty.
export const t = (field, lang) => field?.[lang] || field?.en || '';

const EVENT = `{_id, title, start, venue, address, mapUrl, ticketUrl, description, image, "series": series->title}`;
export const upcomingEvents = () =>
  sanity.fetch(`*[_type=="event" && status!="cancelled" && start >= now()] | order(start asc) ${EVENT}`);
export const pastEvents = () =>
  sanity.fetch(`*[_type=="event" && status!="cancelled" && start < now()] | order(start desc) ${EVENT}`);
export const artists = () => sanity.fetch(`*[_type=="artist"] | order(year desc, name asc)`);
export const settings = () => sanity.fetch(`*[_type=="siteSettings"][0]`);
