<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import type { VariantProps } from 'class-variance-authority';
	import { cn } from '$lib/utils/cn';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { varButton } from './button';

	interface OtherProps {
		onclick?: () => void;
		href?: string;
	}

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof varButton>, OtherProps {}

	export let variant: $$Props['variant'] = 'default',
		loading: $$Props['loading'] = undefined,
		href: $$Props['href'] = undefined,
		onclick: $$Props['onclick'] = undefined;

	function handleClick() {
		if (onclick) onclick();
		if (href) goto(href);
	}
</script>

<button
	type="button"
	on:click={handleClick}
	disabled={loading}
	{...$$props}
	class={cn(varButton({ variant }), $$props.class)}
>
	{#if loading}
		<Icon icon="mdi:loading" class="h-5 w-5 animate-spin" />
	{/if}
	<slot />
</button>

<style lang="postcss">
	.base {
		@apply inline-flex w-full items-center justify-center gap-x-2 rounded px-4 py-1.5 disabled:pointer-events-none disabled:bg-gray-500 disabled:opacity-60;
	}

	.default {
		@apply bg-gray-600 text-white hover:bg-gray-700;
	}
	.primary {
		@apply bg-blue-600 text-white hover:bg-blue-700;
	}
</style>
