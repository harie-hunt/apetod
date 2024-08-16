<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { flash } from '$lib/stores/flash';
	import { cn } from '$lib/utils/cn';
	import type { HTMLFormAttributes } from 'svelte/elements';

	interface OtherProps {
		onsuccess?: () => void;
		onprocess?: () => void;
	}

	interface $$Props extends HTMLFormAttributes, OtherProps {}

	export let onsuccess: $$Props['onsuccess'] = undefined,
		onprocess: $$Props['onprocess'] = undefined;

	let loading: boolean = false;
</script>

<form
	action=""
	method="post"
	{...$$props}
	class={cn('', $$props.class)}
	use:enhance={() => {
		loading = true;
		flash.add({ type: 'loading', text: 'Proses ' + $$props.title || '' });
		if (onprocess) onprocess();
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
