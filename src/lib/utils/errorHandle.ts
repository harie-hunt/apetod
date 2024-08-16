import { Prisma } from '@prisma-app/client';

export function errorHandle(e: unknown) {
	if (e instanceof Prisma.PrismaClientKnownRequestError) {
		return { message: e.code + e.message };
	}
	if (e instanceof Prisma.PrismaClientUnknownRequestError) {
		return { message: e.message };
	}
	return { message: 'Kesalahan !' };
}
