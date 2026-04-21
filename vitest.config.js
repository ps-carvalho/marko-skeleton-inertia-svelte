import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'app/web/resources/js'),
      '@inertiajs/svelte': resolve(
        __dirname,
        'app/web/resources/js/test/inertia-svelte-mock.js',
      ),
    },
    conditions: ['browser'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['app/web/resources/js/**/*.test.js'],
    setupFiles: ['app/web/resources/js/test/setup.js'],
  },
});
