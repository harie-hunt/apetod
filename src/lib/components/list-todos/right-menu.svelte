<script lang="ts">
	import Icon from '@iconify/svelte';
	import ModalHapus from './modal-hapus.svelte';

	export let id: string;

	let isOpen: boolean = false;
</script>

<!-- <button class="float-right rounded-full border p-1 hover:bg-gray-100">
	<Icon icon="mdi:dots-vertical" />
</button> -->

<button
	on:click={() => (isOpen = true)}
	class="rounded-full border p-1 text-red-500 hover:bg-red-100"
>
	<Icon icon="mdi:trash" />
</button>

{#if isOpen}
	<ModalHapus {id} bind:open={isOpen} />
{/if}
