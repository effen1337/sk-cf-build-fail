<script>
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
	onMount(() => {});
</script>

<svelte:head>
	<title>test</title>
</svelte:head>

<div class="relative">
	{#await import('$lib/PageComponents/HomePage/Features.svelte') then { default: Comp }}
		<Comp />
	{/await}
</div>
