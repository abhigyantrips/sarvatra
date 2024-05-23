'use server';

import { db } from './db';

export async function fetchMarksheet(subjectCode: string) {
  const marksheet = await db.result.findMany({
    include: {
      student: true,
    },
    where: {
      subject: {
        subjectCode,
      },
    },
  });

  return marksheet;
}
