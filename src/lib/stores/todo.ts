import { writable } from 'svelte/store';
import type { Todo } from '@prisma-app/client';

export const todos = writable<Todo[]>([]);
