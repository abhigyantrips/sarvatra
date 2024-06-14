'use server';

import { db } from '@/lib/db';

export async function postSubject(values: any) {
  await db.subject.upsert({
    where: {
      subjectCode: values.subjectCode,
    },
    create: {
      subjectCode: values.subjectCode,
      name: values.name,
      semester: values.semester,
      course: {
        connect: {
          courseCode: values.course,
        },
      },
    },
    update: {
      name: values.name,
      semester: values.semester,
      course: {
        connect: {
          courseCode: values.course,
        },
      },
    },
  });
}
