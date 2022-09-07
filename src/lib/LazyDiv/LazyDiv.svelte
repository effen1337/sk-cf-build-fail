<script>
	import { Reload } from '@svicons/ionicons-outline';
	import { onMount } from 'svelte';

	import LoadingDiv from './LoadingDiv.svelte';
	import { inview } from 'svelte-inview';
	export let isInView = false;

	export let scrollDirection = false;
	export let options = {
		rootMargin: '-30px',
		unobserveOnEnter: true
	};
	export let height = false;

	const handleChange = async ({ detail }) => {
		isInView = detail.inView;
		scrollDirection = detail.scrollDirection.vertical;
		window.resizeTo(window.screen.availWidth, window.screen.availHeight);
	};
</script> 

<div use:inview={options} on:enter={handleChange}>
	{#if isInView}
	<div class="w-full {height || ''}">
		<slot />
	</div>
		
	{:else} 
		<LoadingDiv bind:height loadingPos="items-start" />
	{/if}
</div>
