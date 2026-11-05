// Build-time prerender: injects the server-rendered App into dist/index.html so the
// marketing content is readable without JavaScript. No server runtime is involved.
// Canonical and social URLs are added only when site.siteUrl is configured.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = join(root, 'dist', 'index.html');
const serverEntry = join(root, 'build', 'ssr', 'entry-server.js');

const { render, site } = await import(pathToFileURL(serverEntry).href);

const appHtml = render();
let html = readFileSync(htmlPath, 'utf8');

if (!html.includes('<!--app-->')) throw new Error('Prerender placeholder <!--app--> not found in dist/index.html');
html = html.replace('<!--app-->', appHtml);

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
let social = '';
if (site.siteUrl) {
  const url = site.siteUrl.endsWith('/') ? site.siteUrl : `${site.siteUrl}/`;
  social = [
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:image" content="${escapeAttr(`${url}og-image.png`)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:image" content="${escapeAttr(`${url}og-image.png`)}" />`,
  ].join('\n    ');
}
html = html.replace('<!--social-urls-->', social);

writeFileSync(htmlPath, html);
rmSync(join(root, 'build'), { recursive: true, force: true });
console.log(`Prerendered ${(appHtml.length / 1024).toFixed(1)} KB of markup into dist/index.html`);
