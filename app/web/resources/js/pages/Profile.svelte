<script>
  import AppLayout from '../layouts/AppLayout.svelte';

  export let user;

  $: initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const statistics = [
    ['Projects', '12'],
    ['Tasks completed', '847'],
    ['Contributions', '2.4k'],
  ];
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<AppLayout>
  <div class="mx-auto max-w-3xl space-y-8">
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div class="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
      <div class="px-8 pb-8">
        <div class="relative -mt-12 mb-6">
          <div class="h-24 w-24 rounded-2xl bg-white p-1">
            <div
              class="flex h-full w-full items-center justify-center rounded-xl bg-indigo-100"
            >
              <span class="text-2xl font-bold text-indigo-700">{initials}</span>
            </div>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-900">{user.name}</h2>
        <p class="text-gray-500">{user.email}</p>
        <div class="mt-6 flex gap-3">
          <span
            class="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
            >{user.role || 'Developer'}</span
          >
          <span
            class="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700"
            >Active</span
          >
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="rounded-xl border border-gray-200 bg-white p-6">
        <h3
          class="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500"
        >
          Account Info
        </h3>
        <dl class="space-y-4">
          <div class="flex justify-between gap-4">
            <dt class="text-sm text-gray-500">Member since</dt>
            <dd class="text-right text-sm font-medium text-gray-900">
              {user.joined || 'January 2024'}
            </dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-sm text-gray-500">Location</dt>
            <dd class="text-right text-sm font-medium text-gray-900">
              {user.location || 'San Francisco, CA'}
            </dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-sm text-gray-500">Bio</dt>
            <dd class="text-right text-sm font-medium text-gray-900">
              {user.bio || 'Full-stack developer'}
            </dd>
          </div>
        </dl>
      </div>
      <div class="rounded-xl border border-gray-200 bg-white p-6">
        <h3
          class="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500"
        >
          Statistics
        </h3>
        <dl class="space-y-4">
          {#each statistics as row (row[0])}
            <div class="flex justify-between gap-4">
              <dt class="text-sm text-gray-500">{row[0]}</dt>
              <dd class="text-right text-sm font-medium text-gray-900">
                {row[1]}
              </dd>
            </div>
          {/each}
        </dl>
      </div>
    </div>
  </div>
</AppLayout>
