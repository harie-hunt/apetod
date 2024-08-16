import { prisma } from '$lib/server/prisma';
import { z } from 'zod';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { delay } from '$lib/utils/delay';
import { errorHandle } from '$lib/utils/errorHandle';

export const load = (async () => {
	async function getAllTodos() {
		await delay();
		try {
			const todos = await prisma.todo.findMany({
				orderBy: { created_at: 'desc' }
			});
			return { todos };
		} catch (e) {
			const err = errorHandle(e);
			return { error: err.message, todos: [] };
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
	},

	updateCompleted: async ({ request }) => {
		try {
			const form = Object.fromEntries(await request.formData());
			const data = await updateCompletedTodoSchema.parseAsync(form);
			await delay();
			const todo = await prisma.todo.update({
				where: { id: data.id },
				data: { is_completed: data.is_completed }
			});
			return { update: todo, message: 'Berhasil ubah todo !' };
		} catch (e) {
			console.log(e);
			const err = errorHandle(e);

			return fail(400, err);
		}
	},

	deleteTodo: async ({ request }) => {
		try {
			const form = Object.fromEntries(await request.formData());
			const data = await z.object({ id: z.string().uuid() }).parseAsync(form);
			await delay();
			await prisma.todo.delete({
				where: { id: data.id }
			});
			return { delete: { id: data.id }, message: 'Berhasil hapus todo !' };
		} catch (e) {
			console.log(e);
			const err = errorHandle(e);

			return fail(400, err);
		}
	}
} satisfies Actions;

const createTodoSchema = z.object({
	text: z.string().min(4)
});

const updateCompletedTodoSchema = z.object({
	id: z.string().uuid(),
	is_completed: z.coerce.boolean()
});
