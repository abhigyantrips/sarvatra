'use server';

import { db } from '@/lib/db';

export async function getSubjects({
  courseId,
  semester,
}: {
  courseId: number;
  semester: number;
}) {
  const subjects = await db.subject.findMany({
    where: {
      courseId,
      semester,
    },
  });

  return subjects;
}
