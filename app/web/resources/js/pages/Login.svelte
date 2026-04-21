<script>
  import { Link, router } from '@inertiajs/svelte';

  let email = '';
  let password = '';
  let processing = false;
  let errors = {};

  function submit() {
    processing = true;
    router.post(
      '/login',
      { email, password },
      {
        onError: (formErrors) => {
          errors = formErrors;
        },
        onFinish: () => {
          processing = false;
        },
      },
    );
  }
</script>

<svelte:head>
  <title>Sign In</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-slate-950 px-6">
  <div class="w-full max-w-sm">
    <div class="mb-8 text-center">
      <div
        class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600"
      >
        <span class="font-mono text-lg font-bold text-white">M</span>
      </div>
      <h1 class="text-2xl font-bold text-white">Welcome back</h1>
      <p class="mt-1 text-sm text-slate-400">Sign in to your Marko account</p>
    </div>
    <form
      on:submit|preventDefault={submit}
      class="space-y-5 rounded-xl border border-slate-800 bg-slate-900/60 p-6"
    >
      {#if errors.message}
        <div
          class="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
        >
          {errors.message}
        </div>
      {/if}
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-300"
          >Email</span
        >
        <input
          bind:value={email}
          type="email"
          required
          placeholder="demo@example.com"
          class="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
        />
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-300"
          >Password</span
        >
        <input
          bind:value={password}
          type="password"
          required
          placeholder="password"
          class="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
        />
      </label>
      <button
        disabled={processing}
        class="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
      >
        {processing ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
    <p class="mt-6 text-center text-sm text-slate-500">
      <Link href="/" class="text-indigo-400">Back to landing</Link>
    </p>
    <div class="mt-6 rounded-lg border border-slate-800/60 bg-slate-900/30 p-4">
      <p class="mb-1 font-mono text-xs text-slate-500">// Demo Credentials</p>
      <p class="font-mono text-xs text-slate-400">Email: demo@example.com</p>
      <p class="font-mono text-xs text-slate-400">Password: password</p>
    </div>
  </div>
</div>
