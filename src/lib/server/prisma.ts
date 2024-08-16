import { PrismaClient } from '@prisma-app/client';

export const prisma = new PrismaClient({ errorFormat: 'pretty' });
