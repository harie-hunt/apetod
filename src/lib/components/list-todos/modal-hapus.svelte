<script lang="ts">
	import Button from '$lib/ui/button.svelte';
	import Form from '$lib/ui/form.svelte';
	import { fly } from 'svelte/transition';
	export let id: string, open: boolean;
</script>

<section class="fixed inset-0 z-20 bg-black/5 py-12">
	<div transition:fly={{ y: -50 }} class="mx-auto max-w-sm rounded border bg-white p-6 shadow-xl">
		<h1 class="mb-6 text-center text-2xl font-bold">Apakah yakin menghapus ?</h1>
		<Form
			action="/?/deleteTodo"
			let:loading
			onsuccess={() => (open = false)}
			class="flex items-center justify-center gap-x-3"
		>
			<input type="hidden" name="id" value={id} />
			<Button type="submit" {loading}>Ya</Button>
			<Button onclick={() => (open = false)}>Tidak</Button>
		</Form>
	</div>
</section>
