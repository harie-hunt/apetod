<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Button from '$lib/ui/button.svelte';
	import { tick } from 'svelte';
	import { fly } from 'svelte/transition';

	let isOpen: boolean = false,
		loading: boolean = false,
		elemInput: HTMLInputElement;

	async function handleOpen() {
		isOpen = true;
		await tick();
		elemInput && elemInput.focus();
	}
</script>

<slot open={handleOpen} />

{#if isOpen}
	<section class="fixed inset-0 grid items-end bg-black/20">
		<div transition:fly={{ y: 100 }} class="rounded-t-lg bg-white p-6">
			<button
				on:click={() => (isOpen = false)}
				class="mx-auto -mt-4 mb-6 block h-1.5 w-1/3 rounded-full bg-gray-500"
			></button>

			<form
				action="?/addTodo"
				method="post"
				class="space-y-3"
				use:enhance={() => {
					loading = true;
					return async ({ result }) => {
						await applyAction(result);
						loading = false;
						isOpen = false;
					};
				}}
			>
				<label class="block">
					<span class="mb-1 block">Tulis apa yang akan dilakukan !</span>
					<input
						type="text"
						bind:this={elemInput}
						name="text"
						class="w-full rounded border px-3 py-1.5"
					/>
				</label>

				<Button type="submit" {loading}>OK</Button>
			</form>
		</div>
	</section>
{/if}
