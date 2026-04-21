import { describe, expect, test } from 'vitest';
import { createPageRegistry, pageNameFromPath, resolvePage } from './pages';

describe('Svelte page registry', () => {
  test('converts page paths to Inertia component names', () => {
    expect(
      pageNameFromPath('/app/web/resources/js/pages/Admin/Users.svelte'),
    ).toBe('Admin/Users');
  });

  test('registers default exports by page name', () => {
    const Dashboard = {};
    const DashboardModule = { default: Dashboard };
    const pages = createPageRegistry({
      '/app/web/resources/js/pages/Dashboard.svelte': DashboardModule,
    });

    expect(resolvePage(pages, 'Dashboard', 'Svelte')).toBe(DashboardModule);
  });

  test('throws an actionable error for unknown pages', () => {
    expect(() => resolvePage({ Dashboard: {} }, 'Missing', 'Svelte')).toThrow(
      'Unknown Svelte page: Missing. Available pages: Dashboard',
    );
  });
});
