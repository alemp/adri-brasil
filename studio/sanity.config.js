import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'adri-brasil',
  title: 'Adrí Brasil',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID, // set in studio/.env
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
