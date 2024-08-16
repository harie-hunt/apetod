import { prisma } from '$lib/server/prisma';
import { z } from 'zod';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { delay } from '$lib/utils/delay';

export const load = (async () => {
	async function getAllTodos() {
		await delay();
		try {
			const todos = await prisma.todo.findMany({
				orderBy: { created_at: 'desc' }
			});
			return { todos };
		} catch (e) {
			return error(500, 'Kesalahan database !');
		}
	}
	return { promise_todos: getAllTodos() };
}) satisfies PageServerLoad;

export const actions = {
	addTodo: async ({ request }) => {
		try {
			const form = Object.fromEntries(await request.formData());
			const data = await createTodoSchema.parseAsync(form);
			await delay();
			const todo = await prisma.todo.create({ data });
			return { todo, message: 'Berhasil tambah todo !' };
		} catch (e) {
			console.log(e);
			return { message: 'Gagal tambah todo !' };
		}
	}
} satisfies Actions;

const createTodoSchema = z.object({
	text: z.string().min(4)
});
