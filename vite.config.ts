import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves a project site from /<repository-name>/.
// The deploy workflow sets SITE_BASE from the repository name; the local default
// matches this repository so `npm run preview` exercises the same subpath.
const base = process.env.SITE_BASE ?? '/frameshelf-website/';

export default defineConfig({
  base: base.endsWith('/') ? base : `${base}/`,
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    emptyOutDir: true,
  },
  ssr: {
    noExternal: true,
  },
});
