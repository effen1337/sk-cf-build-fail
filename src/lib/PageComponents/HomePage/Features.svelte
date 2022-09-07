<script>
	import { afterUpdate } from 'svelte';
	import LazyDiv from '$lib/LazyDiv/LazyDiv.svelte';
	import { fade, fly, slide, blur, crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Diamond, ArrowDown } from '@svicons/ionicons-outline';


	import ExamplesAutomod from '$lib/PageComponents/HomePage/ExamplesAutomod.svelte';

	const [send, receive] = crossfade({
		duration: 1500,
		easing: quintOut
	});
	import { _, locale, locales, json } from 'svelte-i18n';

	let toggleAnimations = {
		am: true,
		an: true,
		ver: true
	};
	const features = [
		{
			k: 'am',
			fk: ExamplesAutomod
		}
	];
</script>


<section class="container mx-auto min-h-screen">
	{#each features as feature, i}
		<div class="min-h-screen flex items-center justify-center w-full h-full ">
			<LazyDiv
				options={{
					rootMargin: '-10px',
					unobserveOnEnter: true
				}}
			>
				{#if toggleAnimations[feature.k]}
					<div
						class="flex flex-wrap items-center justify-center w-full h-full px-4 md:px-0 gap-8 md:gap-0 {(i + 1) % 2
							? ''
							: 'flex-row md:flex-row-reverse'}"
						in:fly={{
							delay: 0,
							duration: 1000,
							x: 0,
							y: (i + 1) % 2 ? 200 : 0,
							opacity: 0,
							easing: quintOut
						}}
					>
						<div class="w-full px-2 md:w-1/2 pr-10 {(i + 1) % 2 ? '' : 'md:pl-10 md:pr-0'} flex flex-col gap-2">
							<h1 class="text-3xl md:text-5xl lg:text-7xl font-bold">
								{$_(`home.features.${feature.k}.t`)}
							</h1>
							<p class="lg:text-lg">
									{$_(`home.features.${feature.k}.desc`)}
							</p>
							
								{#if $json(`home.features.${feature.k}`).badges && $json(`home.features.${feature.k}`).badges.length}
								<div class="flex flex-col gap-1 items-start justify-center"
								in:fly={{
									delay: 150,
									duration: 1500,
									x: 0,
									y: 400,
									opacity: 0,
									easing: quintOut
								}}
								>
									{#each $json(`home.features.${feature.k}`).badges.slice(0, 5) as badge}
										<div class="badge md:badge-lg flex {badge.pre ? 'badge-warning' : 'badge-info'}">
											{#if badge.pre}<Diamond class="h-4 mr-3" />{/if}
											{badge.t}
										</div>
									{/each}
									{#if $json(`home.features.${feature.k}`).badges.length > 5}
										<div class="dropdown dropdown-right ml-24">
											<div tabindex="0" class="btn btn-square btn-xs">
												<p class="inline">
													+{$json(`home.features.${feature.k}`).badges.length - 5}
												</p>
											</div>
											<div
												tabindex="0"
												class="shadow card compact dropdown-content bg-base-100 rounded-box w-52 flex flex-col gap-1 p-2"
											>

													<h2 class="card-title">{$_('home.features.more')}</h2>
													{#each $json(`home.features.${feature.k}`).badges.slice(5, 20) as badge}
														<div
															class="badge md:badge-lg flex {badge.pre
																? 'badge-warning'
																: 'badge-info'} ml-4"
														>
															{#if badge.pre}<Diamond class="h-4 mr-3" />{/if}
															{badge.t}
														</div>
													{/each}

											</div>
										</div>
									{/if}
									</div>
								{/if}
					
						</div>
						<div class="w-full md:w-1/2">
							<svelte:component this={feature.fk} />
						</div>
					</div>
				{/if}
				<!--
			<button on:click={() => toggleAnimations[feature.k] = !toggleAnimations[feature.k]} class="btn-lg btn-primary">
			Replay
			</button>-->
			</LazyDiv>
		</div>
	{/each}
</section>
