'use server';

import { db } from './db';

export async function postSubject(values: any) {
  await db.subject.upsert({
    where: {
      subjectCode: values.subjectCode,
    },
    create: {
      subjectCode: values.subjectCode,
      name: values.name,
      semester: values.semester,
      credits: values.credits,
      courses: {
        connect: {
          courseCode: values.course,
        },
      },
    },
    update: {
      name: values.name,
      semester: values.semester,
      credits: values.credits,
      courses: {
        connect: {
          courseCode: values.course,
        },
      },
    },
  });
}
