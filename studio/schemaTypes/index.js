import { localized } from './localized';

const event = {
  name: 'event', title: 'Event', type: 'document',
  fields: [
    localized('title', 'Title'),
    { name: 'series', title: 'Series', type: 'reference', to: [{ type: 'series' }] },
    { name: 'start', title: 'Starts', type: 'datetime', validation: (r) => r.required() },
    { name: 'venue', title: 'Venue', type: 'string' },
    { name: 'address', title: 'Address', type: 'string' },
    { name: 'mapUrl', title: 'Map link', type: 'url' },
    { name: 'ticketUrl', title: 'Ticket link', type: 'url' },
    localized('description', 'Description', 'richText'),
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'status', title: 'Status', type: 'string', initialValue: 'scheduled', options: { list: ['scheduled', 'cancelled'] } },
  ],
  orderings: [{ title: 'Date, newest first', name: 'dateDesc', by: [{ field: 'start', direction: 'desc' }] }],
  preview: { select: { title: 'title.en', subtitle: 'start' } },
};
const series = {
  name: 'series', title: 'Event series', type: 'document',
  fields: [localized('title', 'Name'), localized('description', 'Description', 'richText'), { name: 'image', title: 'Image', type: 'image' }],
  preview: { select: { title: 'title.en' } },
};
const artist = {
  name: 'artist', title: 'Artist / production', type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() },
    { name: 'kind', title: 'Type', type: 'string', options: { list: ['band', 'trio', 'dj'] } },
    { name: 'city', title: 'City', type: 'string' },
    { name: 'year', title: 'Year', type: 'number' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'videoUrl', title: 'Video / photos link', type: 'url' },
  ],
  preview: { select: { title: 'name', subtitle: 'city' } },
};
const curriculumLevel = {
  name: 'curriculumLevel', title: 'Curriculum level', type: 'document',
  fields: [
    { name: 'order', title: 'Order', type: 'number', validation: (r) => r.required() },
    { name: 'group', title: 'Group', type: 'string', options: { list: ['beginner', 'intermediate', 'advanced'] } },
    localized('title', 'Title'), localized('description', 'Description', 'richText'),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title.en', subtitle: 'group' } },
};
const siteSettings = {
  name: 'siteSettings', title: 'Site settings', type: 'document',
  fields: [
    localized('tagline', 'Tagline'),
    localized('aboutShort', 'About intro (short)', 'richText'),
    localized('about', 'About text (full story)', 'richText'),
    { name: 'heroImage', title: 'Hero background image', type: 'image', options: { hotspot: true } },
    { name: 'learnImage', title: 'Learn photo', type: 'image', options: { hotspot: true } },
    { name: 'djImage', title: 'DJ photo', type: 'image', options: { hotspot: true } },
    { name: 'bandsImage', title: 'Bands photo', type: 'image', options: { hotspot: true } },
    { name: 'aboutImage', title: 'About photo (portrait)', type: 'image', options: { hotspot: true } },
    { name: 'email', title: 'Contact email', type: 'string' },
    { name: 'instagram', title: 'Instagram URL', type: 'url' },
    { name: 'equipment', title: 'DJ equipment list', type: 'array', of: [{ type: 'string' }] },
  ],
};
export const schemaTypes = [event, series, artist, curriculumLevel, siteSettings];
