import '@testing-library/jest-dom/vitest';
import { beforeEach, vi } from 'vitest';
import { page } from './inertia-svelte-mock';

globalThis.__markoInertiaSvelte = {
  routerPost: vi.fn(),
};

beforeEach(() => {
  globalThis.__markoInertiaSvelte.routerPost.mockClear();
  page.component = 'Dashboard';
  page.props = {
    user: {
      name: 'Marko User',
      email: 'demo@example.com',
    },
  };
});
