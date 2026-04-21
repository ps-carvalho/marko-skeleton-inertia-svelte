import { createInertiaApp } from '@inertiajs/svelte';
import '../css/app.css';
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

createInertiaApp({
  resolve: (name) => resolvePage(pages, name, 'Svelte'),
});
