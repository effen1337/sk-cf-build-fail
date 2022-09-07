<script>
	import { isApple } from '../../stores/gen.js';
</script>


<div
class="mx-auto w-1/4 justify-items-center text-primary p-2 sm:p-6 md:p-10 lg:p-20"
>
<div class="w-full h-full flex justify-center">
{#if $isApple}
<div class="min-w-[150px;] min-h-[150px;] flex items-center justify-center ">
	<svg
		class="w-fit h-full stroke-current fill-current"
		version="1.1"
		viewBox="0 0 100 50"
		enable-background="new 0 0 0 0"
	>
		<circle stroke="none" cx="10" cy="20" r="6">
			<animateTransform
				attributeName="transform"
				dur="1s"
				type="translate"
				values="0 15 ; 0 -15; 0 15"
				repeatCount="indefinite"
				begin="0.1"
			/>
		</circle>
		<circle stroke="none" cx="50" cy="20" r="6">
			<animateTransform
				attributeName="transform"
				dur="1s"
				type="translate"
				values="0 10 ; 0 -10; 0 10"
				repeatCount="indefinite"
				begin="0.2"
			/>
		</circle>
		<circle stroke="none" cx="90" cy="20" r="6">
			<animateTransform
				attributeName="transform"
				dur="1s"
				type="translate"
				values="0 5 ; 0 -5; 0 5"
				repeatCount="indefinite"
				begin="0.3"
			/>
		</circle>
	</svg></div>
{:else}
	<lottie-player
		src="https://assets9.lottiefiles.com/packages/lf20_wvwimamz.json"
		background="transparent"
		speed="1"
		style="width: 100%; height: 100%;"
		loop
		autoplay
	/>
{/if}
</div>
</div>