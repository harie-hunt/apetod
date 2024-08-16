import { writable } from 'svelte/store';

export type Flash = {
	type: 'success' | 'error' | 'loading';
	text: string;
};

export const flashs = writable<Flash | undefined>();

export const flash = {
	add(value: Flash) {
		flashs.set(value);
		if (value.type == 'loading') return;
		setTimeout(() => {
			// console.log('time out flash');

			flashs.set(undefined);
		}, 4000);
	},

	reset() {
		// console.log('resetting flash');

		flashs.set(undefined);
	}
};
