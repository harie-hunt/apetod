<script lang="ts">
	import ModalAdd from '$lib/components/ModalAdd.svelte';
	import Button from '$lib/ui/button.svelte';
	import Flashter from '$lib/ui/flashter.svelte';
	import '../app.css';
	// import type { LayoutData } from './$types';

	// export let data: LayoutData;
</script>

<svelte:head>
	<title>APETOD</title>
</svelte:head>

<main class="flex h-dvh flex-col">
	<header class="border-b bg-gray-100 py-3 text-center">
		<a href="/" class="text-2xl font-bold">APETOD</a>
		<p class="text-gray-400">~ App Plan, To Do, Work ~</p>
	</header>

	<div class="relative mb-3">
		<Flashter />
	</div>

	<div class="flex-1 overflow-y-auto">
		<slot />
	</div>
	<ModalAdd let:open>
		<footer class="flex items-center justify-center bg-white p-1.5">
			<Button onclick={open}>Add</Button>
		</footer>
	</ModalAdd>
</main>
