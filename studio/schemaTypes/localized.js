// A field with one input per language. Add a language here and it appears everywhere.
export const LANGS = [{ id: 'en', title: 'English' }, { id: 'de', title: 'Deutsch' }, { id: 'pt', title: 'Português' }];
export const localized = (name, title, type = 'string') => ({
  name, title, type: 'object',
  fieldsets: [{ name: 'more', title: 'Other languages', options: { collapsible: true, collapsed: true } }],
  fields: LANGS.map((l) => ({ name: l.id, title: l.title, type, fieldset: l.id === 'en' ? undefined : 'more' })),
});
