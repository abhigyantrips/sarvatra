'use server';

import { Course } from '@prisma/client';

import { db } from './db';

export async function getCourse(icNo: string) {
  const user = await db.user.findUnique({
    select: {
      course: true,
    },
    where: {
      icNo,
    },
  });

  return user?.course || ({} as Course);
}
