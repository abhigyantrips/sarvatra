import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  // @ts-ignore-next-line
  if (!global.db) {
    // @ts-ignore-next-line
    global.db = new PrismaClient();
  }

  // @ts-ignore-next-line
  db = global.db;
}
