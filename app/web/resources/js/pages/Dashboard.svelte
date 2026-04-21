<script>
  import { Link } from '@inertiajs/svelte';
  import AppLayout from '../layouts/AppLayout.svelte';

  export let user;
  export let chartData = [];
  export let activities = [];

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const stats = [
    ['Total Visits', '24,592', '+12.5%'],
    ['Active Users', '1,429', '+8.2%'],
    ['Revenue', '$48,290', '-2.4%'],
    ['Tasks Done', '342', '+18.7%'],
  ];
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<AppLayout>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          Here is what is happening with your application today.
        </p>
      </div>
      <span class="text-sm text-gray-400">{today}</span>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {#each stats as stat (stat[0])}
        <div class="rounded-xl border border-gray-200 bg-white p-6">
          <p class="text-sm font-medium text-gray-500">{stat[0]}</p>
          <p class="mt-2 text-3xl font-bold text-gray-900">{stat[1]}</p>
          <p class="mt-4 text-sm font-medium text-emerald-600">
            {stat[2]} from last month
          </p>
        </div>
      {/each}
    </div>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          Traffic Overview
        </h3>
        <div class="flex h-64 items-end justify-between gap-2 px-4">
          {#each chartData as bar, index (index)}
            <div
              class="flex-1 rounded-t-lg bg-indigo-500"
              style={`height: ${bar}%`}
            ></div>
          {/each}
        </div>
      </div>
      <div class="rounded-xl border border-gray-200 bg-white p-6">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          Recent Activity
        </h3>
        <div class="space-y-4">
          {#each activities as activity (activity.title)}
            <div class="flex items-start gap-3">
              <div
                class="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500"
              ></div>
              <div>
                <p class="text-sm text-gray-900">{activity.title}</p>
                <p class="mt-0.5 text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between rounded-xl bg-indigo-600 p-6">
      <div>
        <h3 class="text-lg font-semibold text-white">
          Ready to build something useful?
        </h3>
        <p class="mt-1 text-sm text-indigo-100">
          Marko + Inertia + Svelte + Tailwind is wired together.
        </p>
      </div>
      <Link
        href="/profile"
        class="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-indigo-600"
      >
        View Profile
      </Link>
    </div>
  </div>
</AppLayout>
