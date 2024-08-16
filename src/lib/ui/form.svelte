<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { cn } from '$lib/utils/cn';
	import type { HTMLFormAttributes } from 'svelte/elements';

	interface OtherProps {
		onsuccess?: () => void;
	}

	interface $$Props extends HTMLFormAttributes, OtherProps {}

	export let onsuccess: $$Props['onsuccess'] = undefined;

	let loading: boolean = false;
</script>

<form
	action=""
	method="post"
	{...$$props}
	class={cn('', $$props.class)}
	use:enhance={() => {
		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
			if (result.type == 'success') {
				if (onsuccess) onsuccess();
			}
		};
	}}
>
	<slot {loading} />
</form>
