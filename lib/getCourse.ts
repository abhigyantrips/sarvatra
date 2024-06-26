'use server';

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

  return user?.course;
}
