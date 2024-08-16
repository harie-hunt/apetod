<script lang="ts">
	import ListTodos from '$lib/components/ListTodos.svelte';
	import { todos } from '$lib/stores/todo';
	import type { ActionData, PageData } from './$types';

	export let data: PageData, form: ActionData;
	let loading: boolean = true;

	$: if (form?.todo) todos.update((n) => [form.todo, ...n]);

	data.promise_todos
		.then((val) => {
			if (val) todos.set(val.todos);
			loading = false;
		})
		.catch((e) => {
			console.log(e);
		});
</script>

{#if loading}
	<p>Loading..</p>
{/if}

<ListTodos />
