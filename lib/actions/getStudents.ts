'use server';

import { db } from '@/lib/db';

export async function getStudents({ courseId }: { courseId: number }) {
  const students = await db.user.findMany({
    select: {
      phoneNo: false,
      aadharNo: false,
      panNo: false,
      password: false,
    },
    where: {
      role: 'STUDENT',
      AND: {
        courses: {
          some: {
            courseId: { equals: courseId },
          },
        },
      },
    },
  });

  return students;
}
