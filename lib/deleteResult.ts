'use server';

import { db } from './db';

export async function deleteResult(icNo: string, subjectCode: string) {
  await db.result.deleteMany({
    where: {
      student: {
        icNo,
      },
      subject: {
        subjectCode,
      },
    },
  });
}
