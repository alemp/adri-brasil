// A field with one input per language. Add a language here and it appears everywhere.
export const LANGS = [{ id: 'en', title: 'English' }, { id: 'de', title: 'Deutsch' }, { id: 'pt', title: 'Português' }];
// type 'richText' gives an editor with bold, italic, links and lists.
const richText = { type: 'array', of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }] }] };
export const localized = (name, title, type = 'string') => ({
  name, title, type: 'object',
  fieldsets: [{ name: 'more', title: 'Other languages', options: { collapsible: true, collapsed: true } }],
  fields: LANGS.map((l) => ({ name: l.id, title: l.title, ...(type === 'richText' ? richText : { type }), fieldset: l.id === 'en' ? undefined : 'more' })),
});
