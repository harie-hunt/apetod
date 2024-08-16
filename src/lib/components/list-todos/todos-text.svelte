<script lang="ts">
	import type { Todo } from '@prisma-app/client';
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utils/cn';
	import Form from '$lib/ui/form.svelte';

	export let todo: Todo;
</script>

<Form action="/?/updateCompleted" let:loading class="flex-1" title="Ubah todo">
	<input type="hidden" name="id" value={todo.id} />
	<input type="hidden" name="is_completed" value={!todo.is_completed} />
	<button
		type="submit"
		class={cn('inline-flex w-full items-center gap-x-3', {
			'text-green-500 line-through': todo.is_completed
		})}
	>
		{#if loading}
			<Icon icon="mdi:loading" class="h-5 w-5 animate-spin" />
		{/if}

		{#if !loading}
			<Icon
				icon={todo.is_completed ? 'mdi:checkbox-marked-outline' : 'mdi:checkbox-blank-outline'}
				class={cn('h-5 w-5', { 'text-gray-400': !todo.is_completed })}
			/>
		{/if}

		{todo.text}
	</button>
</Form>
