import js from '@eslint/js';
import globals from 'globals';
import svelte from 'eslint-plugin-svelte';

export default [
  {
    ignores: [
      'bootstrap/ssr/**',
      'node_modules/**',
      'public/build/**',
      'vendor/**',
    ],
  },
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.{js,svelte}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: 'module',
    },
    rules: {
      'no-console': ['warn', { allow: ['error', 'log'] }],
    },
  },
  {
    files: [
      '**/*.test.js',
      'app/web/resources/js/test/**/*.js',
      'tests/e2e/**/*.js',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
];
