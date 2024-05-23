'use server';

import { db } from './db';

export async function fetchResults(values: any) {
  const result = await db.user.findUnique({
    where: {
      icNo: values.icNo,
      courses: {
        some: {
          Course: {
            subjects: {
              some: {
                subjectCode: values.subject,
              },
            },
          },
        },
      },
    },
  });

  return result;
}
