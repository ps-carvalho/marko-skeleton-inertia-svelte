import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import AppLayout from '../layouts/AppLayout.svelte';
import Dashboard from './Dashboard.svelte';
import Landing from './Landing.svelte';
import Login from './Login.svelte';
import Profile from './Profile.svelte';

const user = {
  name: 'Marko User',
  email: 'demo@example.com',
  role: 'Admin',
  joined: 'January 2024',
  location: 'San Francisco, CA',
  bio: 'Full-stack developer exploring Marko.',
};

describe('Svelte skeleton pages', () => {
  test('Landing renders the primary calls to action', () => {
    render(Landing);

    expect(
      screen.getByRole('heading', {
        name: 'Svelte pages from Marko controllers.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Open dashboard' }),
    ).toHaveAttribute('href', '/dashboard');
  });

  test('Login renders demo credential form', () => {
    render(Login);

    expect(
      screen.getByRole('heading', { name: 'Welcome back' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'placeholder',
      'demo@example.com',
    );
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'placeholder',
      'password',
    );
  });

  test('Dashboard renders user data and activity props', () => {
    render(Dashboard, {
      props: {
        user,
        chartData: [45, 62, 38],
        activities: [{ title: 'Deployment complete', time: '2 hours ago' }],
      },
    });

    expect(screen.getByText('Welcome back, Marko User!')).toBeInTheDocument();
    expect(screen.getByText('Deployment complete')).toBeInTheDocument();
  });

  test('Profile renders account details', () => {
    render(Profile, {
      props: {
        user,
      },
    });

    expect(screen.getAllByText('demo@example.com')).toHaveLength(2);
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  test('AppLayout renders navigation and the current user', () => {
    render(AppLayout);

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'href',
      '/dashboard',
    );
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute(
      'href',
      '/profile',
    );
    expect(screen.getByText('Marko User')).toBeInTheDocument();
  });
});
