'use server';

import { Subject } from '@prisma/client';

import { db } from './db';

export async function fetchResults(subject?: Subject) {
  if (!subject) return [];

  const results = await db.user.findMany({
    include: {
      course: true,
      testResults: true,
    },
    where: {
      course: {
        subjects: {
          some: {
            subjectCode: subject.subjectCode,
          },
        },
      },
    },
    orderBy: {
      icNo: 'asc',
    },
  });

  results.map((user) => {
    if (user.testResults.length === 0) return;

    if (
      !user.testResults.some((testResult) => {
        return testResult.subjectId === subject?.id;
      })
    ) {
      user.testResults = [];
    }
  });

  return results;
}
