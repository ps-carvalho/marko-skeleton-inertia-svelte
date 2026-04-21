import { createInertiaApp } from '@inertiajs/svelte';
import { render } from 'svelte/server';
import http from 'http';
import { createPageRegistry, resolvePage } from './support/pages';

const pageModules = import.meta.glob(
  [
    '/app/**/resources/js/pages/**/*.svelte',
    '!/app/**/resources/js/pages/**/*.test.svelte',
    '!/app/**/resources/js/pages/**/*.spec.svelte',
    '/modules/**/resources/js/pages/**/*.svelte',
    '!/modules/**/resources/js/pages/**/*.test.svelte',
    '!/modules/**/resources/js/pages/**/*.spec.svelte',
  ],
  { eager: true },
);

const pages = createPageRegistry(pageModules);

let renderInertiaPagePromise;

function getRenderInertiaPage() {
  renderInertiaPagePromise ??= createInertiaApp({
    resolve: (name) => resolvePage(pages, name, 'Svelte'),
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
      try {
        resolvePage(pages, page.component, 'Svelte');
      } catch {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Unknown page: ${page.component}` }));
        return;
      }

      const renderInertiaPage = await getRenderInertiaPage();
      const { head, body: html } = await renderInertiaPage(page, render);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          head: Array.isArray(head) ? head.join('\n') : '',
          body: html,
        }),
      );
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Inertia SSR server running on http://localhost:${PORT}`);
});
