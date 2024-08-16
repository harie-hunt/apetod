<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { fly } from 'svelte/transition';

	let isOpen: boolean = false,
		loading: boolean = false;
</script>

<slot open={() => (isOpen = true)} />

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
						loading = false;
						isOpen = false;
						await applyAction(result);
					};
				}}
			>
				<label class="block">
					<span class="mb-1 block">Tulis apa yang akan dilakukan !</span>
					<input type="text" name="text" class="w-full rounded border px-3 py-1.5" />
				</label>

				<button
					type="submit"
					class="w-full rounded border bg-gray-700 px-4 py-1.5 text-white hover:bg-gray-800 disabled:opacity-60"
				>
					{loading ? '...' : 'Add'}
				</button>
			</form>
		</div>
	</section>
{/if}
