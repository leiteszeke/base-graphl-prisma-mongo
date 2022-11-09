import { PrismaClient } from '@prisma/client';
import logger from '../helpers/logger';

export const prisma = new PrismaClient();

export const initPrisma = async () => {
  try {
    await prisma
      .$connect()
      .then(() => logger.info('🐘 MongoDB connected'))
      .catch((err) => logger.error(`🐘 MongoDB connection error`, err));
  } catch (e) {
    logger.error(`🐘 MongoDB connection error`, e);
  }
};
