import { prisma } from '$lib/server/prisma';
import { z } from 'zod';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { delay } from '$lib/utils/delay';

export const load = (async ({ depends }) => {
	async function getAllTodos() {
		await delay();
		return await prisma.todo.findMany({
			orderBy: { created_at: 'desc' }
		});
	}
	return { promise_todos: getAllTodos() };
}) satisfies PageServerLoad;

export const actions = {
	addTodo: async ({ request }) => {
		try {
			const form = Object.fromEntries(await request.formData());
			const data = await createTodoSchema.parseAsync(form);
			await delay();
			await prisma.todo.create({ data });
		} catch (e) {
			console.log(e);
		}
	}
} satisfies Actions;

const createTodoSchema = z.object({
	text: z.string().min(4)
});
