<script>
	import { onDestroy, onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import navigationState from '../stores/NavigationState';
	import { fly, fade, draw } from 'svelte/transition';

	const progress = tweened(0, {
		duration: 3500,
		easing: cubicOut
	});
	const unsubscribe = navigationState.subscribe(async (state) => {
		if (state === 'loaded') {
			progress.set(1, { duration: 200 });
		}
	});
	onMount(() => {
		progress.set(0.9);
	});
	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="progress-bar" out:fade={{ duration: 200 }}>
	<div
		class="progress-barr shadow-xl"
		style={`--width: ${$progress * 100}%;--background-position: ${100 - $progress * 100}`}
	/>
</div>

<style>
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 0.5rem;
		z-index: 99999999;
	}
	.progress-sliver {
		width: var(--width);
		background-color: white;
		height: 100%;
	}

	.progress-barr {
		display: block;
		height: 100%;
		background: linear-gradient(
			90deg,
			#ffd33d,
			#ea4aaa 17%,
			#b34bff 34%,
			#01feff 51%,
			#ffd33d 68%,
			#ea4aaa 85%,
			#b34bff
		);
		background-size: 300% 100%;
		width: var(--width);
		background-position: var(--background-position);
	}
</style>
