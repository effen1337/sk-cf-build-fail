<script>
    	import Sparklify from '$lib/Sparkles/Sparkles.svelte';
        import { getStores, navigating, page, session } from '$app/stores';
        import {
		Sparkles,
		Bug
	} from '@svicons/ionicons-outline';
    import {OFFICIAL_DASH_LINK, UNOFFICIAL_DASH_LINK} from '../stores/gen.js'
	const dashmenu = [
		{
			k: 'new',
			t: 'New Dashboard',
			u: OFFICIAL_DASH_LINK,
            external: true,
			e: Sparkles
		},
		{
			k: 'old',
			t: 'Old Dashboard',
			u: UNOFFICIAL_DASH_LINK,
            external: true,
			e: Bug
		}
	];
</script>




<div class="dropdown dropdown-left cursor-pointer">
    <div tabindex="0">
        <slot />
    </div>
    <ul
        tabindex="0"
        class="p-2 shadow menu menu-compact dropdown-content !right-4 !top-8 bg-base-200 rounded-box border-2 border-base-300/10 md:w-52"
    >
        {#each dashmenu as { disabled, external, e, t, k, u }}
            <li
                class="my-1 transition-colors duration-700 rounded-md {disabled
                    ? 'disabled'
                    : ''} "
            >
                <a
                    href={disabled ? $page.url.pathname : u}
                    class={disabled ? 'disabled' : undefined}
                    rel={external ? 'external' : undefined}
                    target={external ? '_blank' : undefined}
                >
                    <svelte:component this={e} class="inline-block w-5 h-5 stroke-current" />
                    {#if k == 'new'}
                        <Sparklify>{t}</Sparklify>
                    {:else}
                        {t}
                    {/if}
                </a>
            </li>
        {/each}
    </ul>
</div>