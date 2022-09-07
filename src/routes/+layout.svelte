<script>
	import '../styles/tailwind-output.css';
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	let theme = 'dark';
	let loading = true;
	let pending = {
		themeInterval: null,
		stateFetchTimeout: null
	};

	onMount(async () => {
		loading = false;
		theme =
			localStorage.getItem('theme') ||
			(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		document.body.setAttribute('data-theme', theme);
	});

	onDestroy(() => {
		clearInterval(pending.themeInterval);
	});
</script>

<div class="antialiased text-base-content bg-base-100">
	<div class="shadow drawer drawer-mobile min-h-screen">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" placeholder="void" />

		<div
			class="drawer-content steamEffect"
			style="max-width: 100%;min-height: 100vh;overflow-x: hidden;"
		>
			<div><slot /></div>
		</div>
	</div>
</div>

<style>
	:root {
		--toastContainerTop: 90px;
		--toastContainerZIndex: 55;
	}

	.steamEffect {
		background: var(--ayowtf);
		background-repeat: no-repeat;
		background-size: cover;
	}

	:global(.toggle) {
		@apply bg-error border-error border-2;
	}
	:global(.toggle) {
		border-width: 2px !important;
	}
	:global(.toggle:not(:checked):not(:disabled)) {
		@apply bg-error border-error;
	}
	:global(.toggle:checked:not(:disabled)) {
		@apply bg-success border-success;
	}
	:global(.toggle:checked:disabled) {
		@apply bg-green-700 border-green-900;
	}
	:global(:toggle:disabled:not(:checked)) {
		@apply bg-red-700 border-red-900;
	}
</style>
