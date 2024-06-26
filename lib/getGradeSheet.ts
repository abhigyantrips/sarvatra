'use server';

import { db } from './db';

export async function getGradeSheet(icNo: string) {
  const subjects = await db.subject.findMany({
    where: {
      courses: {
        some: {
          students: {
            some: {
              icNo,
            },
          },
        },
      },
    },
    orderBy: {
      subjectCode: 'asc',
    },
  });
  const gradeSheet = await db.result.findMany({
    select: {
      overall: true,
      subject: true,
    },
    where: {
      student: {
        icNo,
      },
    },
    orderBy: {
      subject: {
        semester: 'asc',
      },
    },
  });

  subjects.map((subject) => {
    if (!gradeSheet.some((result) => result.subject === subject)) {
      gradeSheet.push({ subject, overall: null });
    }
  });

  return gradeSheet;
}
