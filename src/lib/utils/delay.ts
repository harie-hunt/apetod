import { dev } from '$app/environment';

export async function delay(ms: number = 3000) {
	if (!dev) return;
	return await new Promise((res) => setTimeout(res, ms));
}
