import { createInertiaApp } from '@inertiajs/svelte';
import { render } from 'svelte/server';
import http from 'http';

const pageModules = import.meta.glob([
  '/app/**/resources/js/pages/**/*.svelte',
  '/modules/**/resources/js/pages/**/*.svelte',
], { eager: true });

function pathToName(path) {
  const match = path.match(/\/resources\/js\/pages\/(.+)\.svelte$/);
  return match ? match[1] : path;
}

const pages = {};
for (const [path, mod] of Object.entries(pageModules)) {
  pages[pathToName(path)] = mod;
}

let renderInertiaPagePromise;

function getRenderInertiaPage() {
  renderInertiaPagePromise ??= createInertiaApp({
    resolve: (name) => pages[name],
  });

  return renderInertiaPagePromise;
}

const PORT = process.env.INERTIA_SSR_PORT || 13714;

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const page = JSON.parse(body);
      const pageModule = pages[page.component];

      if (!pageModule) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Unknown page: ${page.component}` }));
        return;
      }

      const renderInertiaPage = await getRenderInertiaPage();
      const { head, body: html } = await renderInertiaPage(page, render);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        head: Array.isArray(head) ? head.join('\n') : '',
        body: html,
      }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Inertia SSR server running on http://localhost:${PORT}`);
});
