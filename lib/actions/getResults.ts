'use server';

import type { User } from '@prisma/client';

import { db } from '@/lib/db';

export async function getResults({ studentId }: { studentId: User['id'] }) {
  const results = await db.result.findFirst({
    where: {
      studentId,
    },
  });

  return results;
}
