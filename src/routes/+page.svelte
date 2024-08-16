<script lang="ts">
	import ListTodos from '$lib/components/ListTodos.svelte';
	import Loading from '$lib/components/loading.svelte';
	import { flash } from '$lib/stores/flash';
	import { todos } from '$lib/stores/todo';
	import type { ActionData, PageData } from './$types';

	export let data: PageData, form: ActionData;
	let loading: boolean = true;

	$: if (form?.todo) todos.update((n) => [form.todo, ...n]);
	$: if (form?.update)
		todos.update((n) =>
			n.map((val) => {
				if (val.id == form.update.id) val = form.update;
				return val;
			})
		);

	$: if (form?.delete) todos.update((n) => n.filter((val) => val.id != form.delete.id));

	$: if (form?.message) {
		flash.add({ type: form.success ? 'success' : 'error', text: form.message });
		console.log('Message:', form.message);
	}

	data.promise_todos.then((val) => {
		loading = false;
		if (val.todos) todos.set(val.todos);
		if (val.error) console.log(val.error);
	});
</script>

<Loading {loading} />

<ListTodos />
