<script lang="ts">
	import ListTodos from '$lib/components/ListTodos.svelte';
	import { todos } from '$lib/stores/todo';
	import type { ActionData, PageData } from './$types';

	export let data: PageData, form: ActionData;
	let loading: boolean = true;

	$: if (form?.todo) todos.update((n) => [form.todo, ...n]);

	data.promise_todos.then((val) => {
		if (val.todos) todos.set(val.todos);
		if (val.message) console.log(val.message);
		loading = false;
	});
</script>

{#if loading}
	<p>Loading..</p>
{/if}

<ListTodos />
