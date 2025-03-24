import { PrismaClient } from '@prisma/client';
import { softDeleteMiddleware } from './softDeleteMiddleware';

const prisma = new PrismaClient();
softDeleteMiddleware(prisma);
