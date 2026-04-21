import Link from './MockLink.svelte';

export { Link };

export const page = {
  component: 'Dashboard',
  props: {
    user: {
      name: 'Marko User',
      email: 'demo@example.com',
    },
  },
};

export const router = {
  post: (...args) => globalThis.__markoInertiaSvelte.routerPost(...args),
};
