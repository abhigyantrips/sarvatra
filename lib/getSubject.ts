'use server';

import { db } from './db';

export async function getSubject(subjectCode: string) {
  const subject = await db.subject.findUnique({
    include: {
      courses: true,
    },
    where: {
      subjectCode,
    },
  });

  return subject;
}
