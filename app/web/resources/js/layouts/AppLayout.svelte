<script>
  import { Link, page, router } from '@inertiajs/svelte';

  $: user = $page.props.user ?? {};
  $: userName = user.name ?? 'Guest';
  $: userEmail = user.email ?? '';
  $: initials = userName === 'Guest'
    ? 'G'
    : userName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  function itemClass(component) {
    return [
      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
      $page.component === component
        ? 'bg-indigo-50 text-indigo-700'
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
    ].join(' ');
  }
</script>

<div class="min-h-screen bg-gray-50">
  <aside class="fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white">
    <div class="flex h-16 items-center border-b border-gray-200 px-6">
      <Link href="/" class="flex items-center gap-2 transition-opacity hover:opacity-80">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <span class="text-sm font-bold text-white">M</span>
        </div>
        <span class="text-lg font-semibold text-gray-900">Marko</span>
      </Link>
    </div>
    <nav class="space-y-1 p-4">
      <Link href="/dashboard" class={itemClass('Dashboard')}>Dashboard</Link>
      <Link href="/profile" class={itemClass('Profile')}>Profile</Link>
    </nav>
    <div class="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4">
      <div class="flex items-center gap-3">
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100">
          <span class="text-sm font-medium text-indigo-700">{initials}</span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-gray-900">{userName}</p>
          <p class="truncate text-xs text-gray-500">{userEmail}</p>
        </div>
        <button
          type="button"
          on:click={() => router.post('/logout')}
          class="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
          title="Sign out"
        >
          Sign out
        </button>
      </div>
    </div>
  </aside>

  <div class="pl-64">
    <header class="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
      <h1 class="text-xl font-semibold text-gray-900">{$page.component}</h1>
      <span class="text-sm text-gray-500">Marko Framework Demo</span>
    </header>
    <main class="p-8">
      <slot />
    </main>
  </div>
</div>
