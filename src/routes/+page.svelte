<script lang="ts">
	import ModalAdd from '$lib/components/ModalAdd.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header class="my-3 text-center">
	<a href="/" class="text-2xl font-bold">APETOD</a>
	<p class="text-gray-400">~ App Plan, To Do, Work ~</p>
</header>

{#await data.promise_todos}
	<p>Loading..</p>
{:then todos}
	<ul class="my-3 divide-y bg-white">
		{#each todos as todo}
			<li class="p-3">
				<p>{todo.text}</p>
			</li>
		{/each}
	</ul>
{/await}

<ModalAdd let:open>
	<button on:click={open} class="rounded border bg-white px-4 py-1.5">Add</button>
</ModalAdd>
