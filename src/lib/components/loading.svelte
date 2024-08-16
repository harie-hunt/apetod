<script lang="ts">
	import Icon from '@iconify/svelte';

	export let loading;
</script>

{#if loading}
	<div class="flex items-center gap-3 p-6">
		<Icon icon="mdi:loading" class="h-5 w-5 animate-spin" />
		<p>Loading..</p>
	</div>
{/if}
