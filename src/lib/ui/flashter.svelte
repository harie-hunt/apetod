<script lang="ts">
	import { flashs, type Flash } from '$lib/stores/flash';
	import { cn } from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';

	function getIcon(type: Flash['type']) {
		switch (type) {
			case 'success':
				return 'mdi:check-circle-outline';
			case 'error':
				return 'mdi:error-outline';
			default:
				return 'mdi:loading';
		}
	}

	// $: console.log($flashs);
</script>

{#if $flashs}
	<section class="absolute inset-x-0 px-6">
		<div transition:fly={{ y: -20 }} class={cn('base', $flashs.type)}>
			<Icon
				icon={getIcon($flashs.type)}
				class={cn('h-5 w-5', { 'animate-spin': $flashs.type == 'loading' })}
			/>
			{$flashs.text}
		</div>
	</section>
{/if}

<style lang="postcss">
	.base {
		@apply mx-auto flex w-fit items-center gap-1 rounded border bg-white px-3 py-1.5 font-medium shadow;
	}

	.success {
		@apply bg-green-500 text-white;
	}

	.error {
		@apply bg-red-500 text-white;
	}

	.loading {
		@apply bg-gray-600 text-white;
	}
</style>
