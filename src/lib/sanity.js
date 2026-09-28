import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { toHTML } from '@portabletext/to-html';

export const sanity = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || 'g86661w2', // public ID, also visible in every image URL
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
});
const builder = imageUrlBuilder(sanity);
export const img = (src, w = 1200) => builder.image(src).width(w).auto('format').url();
// Localized field helper: falls back to English when a translation is empty.
export const t = (field, lang) => field?.[lang] || field?.en || '';
// Rich text (Portable Text) to HTML; plain strings from before the rich text switch still render.
export const rich = (v) => (Array.isArray(v) ? toHTML(v) : v ? `<p>${String(v).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</p>` : '');

const EVENT = `{_id, title, start, venue, address, mapUrl, ticketUrl, description, image, "series": series->title}`;
export const upcomingEvents = () =>
  sanity.fetch(`*[_type=="event" && status!="cancelled" && start >= now()] | order(start asc) ${EVENT}`);
export const pastEvents = () =>
  sanity.fetch(`*[_type=="event" && status!="cancelled" && start < now()] | order(start desc) ${EVENT}`);
export const artists = () => sanity.fetch(`*[_type=="artist"] | order(year desc, name asc)`);
export const curriculum = () => sanity.fetch(`*[_type=="curriculumLevel"] | order(order asc)`);
export const settings =() => sanity.fetch(`*[_type=="siteSettings"][0]`);
