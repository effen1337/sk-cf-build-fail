<script>

import { draw } from 'svelte/transition'

	export let fill = 'currentColor';
	export let d = '';
	export let width = '24';
	export let height = '24';
	export let viewBox = '0 0 24 24';
	export let stroke = 'currentColor';
	export let sw = '2';
	export let sl = 'round';
	export let slj = 'round';
	export let classes = 'w-6 h-6';
	export let title = 'An Icon';
</script>

<svg {title} class={classes} {width} {height} {viewBox} {fill} xmlns="http://www.w3.org/2000/svg">
	{#if typeof d == "string"}
	<path in:draw="{{ delay: 200, duration: 3000 }}" {d} {stroke} stroke-width={sw} stroke-linecap={sl} stroke-linejoin={slj} />
	{:else}
	{#each d as ud, i}
	<path in:draw="{{ delay: i * 200, duration: 1000 }}" d={ud} {stroke} />
	{/each}
	{/if}
</svg>
