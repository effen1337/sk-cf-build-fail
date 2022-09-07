
<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>


<div class="relative w-full h-full">
{$page.error}
</div>

