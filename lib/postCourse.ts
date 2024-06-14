'use server';

import { db } from '@/lib/db';

export async function postCourse(values: any) {
  await db.course.upsert({
    where: {
      courseCode: values.courseCode,
    },
    create: {
      courseCode: values.courseCode,
      name: values.name,
      semesters: values.semesters,
      credits: values.credits,
      total: values.credits * 40,
    },
    update: {
      name: values.name,
      semesters: values.semesters,
      credits: values.credits,
      total: values.credits * 40,
    },
  });
}
