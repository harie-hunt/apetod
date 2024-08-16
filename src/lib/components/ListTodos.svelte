<script lang="ts">
	import { todos } from '$lib/stores/todo';
	import { fly } from 'svelte/transition';
	import RightMenu from './list-todos/right-menu.svelte';
	import TodosText from './list-todos/todos-text.svelte';
	import { cn } from '$lib/utils/cn';
	import { flip } from 'svelte/animate';

	$: getTodos = () => {
		let current = $todos;
		current.sort((a, b) => {
			return a.is_completed > b.is_completed ? 1 : a.is_completed < b.is_completed ? -1 : 0;
		});
		return current;
	};

	$: todos2 = getTodos();
</script>

<ul class="my-3 space-y-1">
	{#each todos2 as todo, index (todo.id)}
		<li
			animate:flip
			in:fly={{ x: -50, delay: 200 * index }}
			out:fly={{ x: 50 }}
			class={cn('flex bg-white px-4 py-3', { 'bg-green-50': todo.is_completed })}
		>
			<TodosText {todo} />
			{#if !todo.is_completed}
				<RightMenu id={todo.id} />
			{/if}
		</li>
	{/each}
</ul>
