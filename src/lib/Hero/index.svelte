<script>
	import WickLogo from '$lib/Icons/WickLogo.svelte';
	import {
		ChevronForward,
		ChevronUp,
		Add,
		Albums,
		Download,
		HandRight,
		ShieldCheckmark,
		Footsteps,
		Newspaper,
		Sparkles
	} from '@svicons/ionicons-outline';
	import { onMount } from 'svelte';
	import { OFFICIAL_DASH_LINK, WICK_INVITE_LINK } from '../../stores/gen.js';
	import Sparklify from '$lib/Sparkles/Sparkles.svelte';
	import { Confetti } from 'svelte-confetti'
	import ToggleConfetti from './ToggleConfetti.svelte'
	import { isApple } from '../../stores/gen.js';

	let stats = [
		{
			k: 'servers',
			i: Albums,
			t: 'Servers'
		},
		{
			k: 'raid',
			i: ShieldCheckmark,
			t: 'Raids Stopped'
		},
		{
			k: 'nuke',
			i: HandRight,
			t: 'Nukes Stopped'
		}
	];

	let popularGuilds = [
		{
			name: 'Fantasy Football Chat',
			memberCount: 12914,
			invite: 'fantasyfootball',
			badges: ['https://cdn.discordapp.com/emojis/748656538767589487.png?v=1'],
			avatar:
				'https://cdn.discordapp.com/icons/498070362962264067/d51e51557237540af5f2aa3819bd9df0.webp?size=64',
			banner:
				'https://cdn.discordapp.com/banners/498070362962264067/a_4e3350b454c8045559df699f1a715bd0.webp?size=512',
			owners: ['466047931070414858']
		},

		{
			name: 'Big Time',
			memberCount: 395209,
			invite: 'bigtime',
			badges: [],
			avatar:
				'https://cdn.discordapp.com/icons/666344617536520207/ab7b397a8a5fe55efae5d8cbd863771e.webp?size=64',
			banner:
				'https://cdn.discordapp.com/banners/666344617536520207/95abbc8c28fb1d6ee3bb3649cce1895f.webp?size=512',
			owners: ['170319581934649344']
		},

		{
			name: 'Among Us',
			memberCount: 128056,
			invite: 'amongusgame',
			badges: [],
			avatar:
				'https://cdn.discordapp.com/icons/702494604104302692/a_807ac7a4ecf2aae3a8bdf819f320ffea.webp?size=64',
			banner:
				'https://cdn.discordapp.com/banners/702494604104302692/058e1abe1131659dfa7ea996649a7fe4.webp?size=512',
			owners: ['193691017432530946']
		},
		{
			name: 'Full Send NFT',
			memberCount: 221421,
			invite: 'fullsendnft',
			badges: ['https://cdn.discordapp.com/emojis/748656538767589487.png?v=1'],
			avatar:
				'https://cdn.discordapp.com/icons/929903251418148885/c5ca9d1b35cf3a812f97bbc71b95d9af.webp?size=64',
			owners: ['128202318876246017'],
			banner:
				'https://cdn.discordapp.com/banners/929903251418148885/c0f57f1325f39b1f33a8b15f5175ae5e.webp?size=512'
		},
		{
			name: 'Jet’s Dream World | Social • Chill • Fun Anime Egirl Stickers Emotes Emojis Gaming Memes Nitro Lofi',
			memberCount: 448100,
			invite: 'world',
			badges: [],
			avatar:
				'https://cdn.discordapp.com/icons/327892735963037696/a_0726127c36090f371ac0779f857692bc.webp?size=64',
			banner:
				'https://cdn.discordapp.com/banners/327892735963037696/f9c3e5f42467404a4e6e5fd357d9540c.webp?size=512',
			owners: ['373069496681758720']
		},
		{
			name: 'adidas Originals',
			memberCount: 59173,
			invite: 'adidasoriginals',
			badges: [],
			avatar:
				'https://cdn.discordapp.com/icons/928605061767106560/a_3849b6b1d714287ca3c43a7a189a8f19.webp?size=64',
			banner:
				'https://cdn.discordapp.com/banners/928605061767106560/1692177c0c48a589ddd9f2b3171c43b5.webp?size=512',
			owners: ['389055039496388610']
		},
		{
			name: 'Chill Heaven | Social • Anime • Egirls • Emotes • Emojis • Gaming • Fun • Active VCs • Nitros • NFTs',
			memberCount: 554432,
			invite: 'emotes',
			badges: [],
			avatar:
				'https://cdn.discordapp.com/icons/701459880992702615/a_ca2177169902dde860ac84c9bc5a7797.webp?size=64',
			banner:
				'https://cdn.discordapp.com/banners/701459880992702615/a_9c698bd5725a143ee1ce6129eaeaffaf.webp?size=512',
			owners: ['699018362348503160']
		},
		{
			avatar:
				'https://cdn.discordapp.com/icons/827254215717814282/a_8c143d3803c8b4a3d439a3d4f7889fd5.webp?size=64',
			banner:
				'https://cdn.discordapp.com/banners/827254215717814282/76ffb207bb460bdb8c0965eaea4d041e.webp?size=512',
			memberCount: 62719,
			name: 'World Of Walker',
			invite: 'alanwalker'
		},
		{
			avatar:
				'https://cdn.discordapp.com/icons/750905235622330460/8938df0487ea5637c1bd81430f724bb2.webp?size=64',
			banner:
				'https://cdn.discordapp.com/banners/750905235622330460/a_ca6f41669252b32e798f1553d5cb4e3f.webp?size=512',
			memberCount: 33495,
			name: 'Binance Community',
			invite: 'binance'
		}
	].sort(() => 0.5 - Math.random());

	onMount(async () => {
		try {
			stats = await (await fetch('/papi/stats')).json();
			stats = stats
				.map((e) => {
					if (e.k) {
						return {
							...e,
							i: e.k == 'raid' ? ShieldCheckmark : e.k == 'nuke' ? HandRight : Albums
						};
					} else return false;
				})
				.filter((e) => e);
		} catch (e) {
			stats = [];
		}
	});
</script>

<div
	class="min-h-[calc(100vh_-_80px)] min-w-full flex flex-row-reverse md:flex-row flex-wrap items-center justify-center relative"
>
	<div
		class="relative min-h-[950px;] md:min-h-[950px;] lg:min-h-[1000px;] xl:min-h-[900px;] min-w-full my-[5vh] "
	>
		<div class="absolute stripes  inset-0 w-full h-[100vh] z-10 py-0 lg:py-24">
			<div class="stripe s1" />
			<div class="stripe s2" />
			<div class="stripe s3" />
		</div>
		<div
			class="absolute w-screen h-[50vh] top-0 z-10 transform -skew-y-12 wickeffect py-0 lg:py-24"
		/>
		<div class="absolute w-full inset-0 z-20  flex flex-col items-start justify-center">
			<div class="w-full h-full flex flex-col gap-12 pt-[5vh] md:pt-[4vh] ">
				<div
					class="flex flex-row flex-wrap gap-8 xl:gap-0 lg:px-30 xl:pt-[6vh] items-center justify-center px-4 lg:px-28"
				>
					<div class="w-full xl:w-1/2 px-1 md:px-8 flex flex-col gap-1 lg:pt-12 ">
						<h1
							class="lg:text-7xl text-3xl sm:text-5xl py-3 lg:py-0 font-bold text-opacity-30 max-w-md md:max-w-none"
						>
							Discord moderation and security that is always one step ahead
						</h1>
						<div class="flex flex-row gap-4 items-center justify-center xl:justify-start px-6 py-4">
							<a
								href={WICK_INVITE_LINK}
								target="_blank"
								class="btn w-fit xl:btn-wide px-4 py-1 bg-base-content hover:bg-base-content/95 text-base-300 border-0 shadow-md rounded-lg flex flex-row flex-nowrap gap-2 group"
							>
								<Add class="w-4 h-4 group-hover:animate-pulse" />
								<div>Invite</div>
							</a>

							<a
								href={OFFICIAL_DASH_LINK}
								target="_blank"
								class="btn w-fit xl:btn-wide px-4 py-1 bg-base-content hover:bg-base-content/95 text-base-300 border-0 shadow-md rounded-lg flex flex-row flex-nowrap gap-2 group "
							>
								<ChevronForward
									class="w-4 h-4 transition-transform duration-700 group-hover:translate-x-2"
								/>
								<div>Dashboard</div>
							</a>
						</div>
					</div>

					<div class="w-full xl:w-1/2 h-fit relative rounded-md overflow-hidden">
						<img
							class="shadow-md"
							width="840"
							height="475"
							src="/hero_placeholder.webp"
							alt="Dashboard Alan Walker"
						/>
					</div>
				</div>

				<div
					class="w-full bg-base-100/50 mt-4 shadow-md backdrop-blur-md flex flex-row flex-wrap justify-evenly items-center py-4 gap-6"
				>
					<div class="flex flex-row flex-wrap gap-6 items-center justify-center">
						{#each stats as stat, i}
							<div
								class="flex flex-row flex-nowrap gap-2 items-center justify-center rounded-md px-2 py-1 "
							>
								<svelte:component this={stat.i} class="w-6 h-6 lg:w-8 lg:h-8" />
								<div class="flex flex-col">
									<div class="text-sm lg:text-lg">{stat.t}</div>
									<div class="flex flex-row flex-wrap gap-1 justify-start items-center ">
										<div class="font-medium text-sm lg:text-lg">
											{#if stat.v}
												{Number(stat.v).toLocaleString('en-GB', {
													notation: 'compact',
													compactDisplay: 'short'
												})}
											{:else}
												<div class="animate-pulse">•••</div>
											{/if}
										</div>
										<div class="badge badge-xs lg:badge-sm badge-ghost select-none">
											<ChevronUp class="inline-block w-4 h-4 mr-1 stroke-current text-success" />
											{#if stat.diff}
												{Number(stat.diff).toLocaleString('en-GB', {
													notation: 'compact',
													compactDisplay: 'short'
												})}
											{:else}
												<div class="animate-pulse">•••</div>
											{/if}
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>

					{#if false}
						<div class="flex flex-row flex-wrap gap-3 items-center justify-center">
							{#each popularGuilds.slice(0, 6) as guild, i}
								<div
									class="w-8 h-8 lg:w-14 lg:h-14 rounded-md flex items-center justify-center overflow-hidden shadow-sm"
								>
									<img loading="lazy" width="64" height="64" src={guild.avatar} alt={guild.name} />
								</div>
							{/each}
						</div>
					{:else}
						<div class="flex items-center justify-center">
							<a href="https://docs.wick.bot/changelog/v5.x/5.0.0/" target="_blank" class="flex flex-row flex-nowrap rounded-md justify-center items-center bg-base-300 gap-2 px-2 py-1 lg:px-4 lg:py-2 shadow">
								<div> 
									
									<ToggleConfetti>
										<button slot="label" name="News">
											<Sparkles class="w-4 h-4 md:w-6 md:h-6" />
										</button>
										<Confetti cone delay={[0, 1500]} />
									</ToggleConfetti>
								
								</div>
								<div class="font-normal md:font-medium text-base md:text-lg">A new version of Wick released!</div>
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.wickeffect {
		background: linear-gradient(
			to right,
			var(--herograd1),
			var(--herograd1),
			var(--herograd2),
			var(--herograd3),
			var(--herograd3)
		);
	}

	.stripes {
		position: absolute;
		height: 100vh;
		width: 100%;
		transform: skewY(-10deg);
		top: -130px;
	}

	.stripes .s1 {
		width: 60%;
		left: 0;
		top: 0vh;
		background: linear-gradient(90deg, #01eeff, rgba(251, 255, 0, 0));
		position: absolute;
	}

	.stripes .s2 {
		width: 38%;
		top: 10vh;
		left: 0;
		background: linear-gradient(90deg, #0176fc, rgba(0, 140, 255, 0));
		position: absolute;
	}

	.stripes .s3 {
		width: 38%;
		top: 80vh;
		right: 0;
		background: linear-gradient(90deg, hsla(46, 98%, 78%, 0), #7d00cf);
		position: absolute;
	}

	.stripe {
		height: 150px;
	}

	@media (max-width: 1000px) {
		.wickeffect {
			background: linear-gradient(to right, var(--herograd1), var(--herograd3), var(--herograd3));
		}

		.stripes .s3 {
			width: 68%;
			top: 65vh;
		}
	}
</style>
