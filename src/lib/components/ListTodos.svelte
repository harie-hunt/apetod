<script lang="ts">
	import { todos } from '$lib/stores/todo';
	import { fly } from 'svelte/transition';
</script>

<ul class="my-3 divide-y bg-white">
	{#each $todos as todo, index}
		{#key index}
			<li transition:fly={{ x: -50, delay: 100 * index }} class="px-6 py-3">
				<p>{todo.text}</p>
			</li>
		{/key}
	{/each}
</ul>
