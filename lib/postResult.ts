'use server';

import { Prisma, Subject } from '@prisma/client';

import { db } from './db';

type StudentWithResults = Prisma.UserGetPayload<{
  include: { course: true; testResults: true };
}>;

export async function postResult(
  user: StudentWithResults,
  subject: Subject,
  values: any
) {
  const result = await db.result.upsert({
    where: {
      resultId: {
        studentId: user.id,
        subjectId: subject.id,
      },
    },
    create: {
      studentId: user.id,
      subjectId: subject.id,
      PH1: values.PH1,
      PH2: values.PH2,
      assignment: values.assignment,
      IA: values.PH1 + values.PH2 + values.assignment,
      finals: values.finals,
      overall: values.PH1 + values.PH2 + values.assignment + values.finals,
      graderId: subject.teacherId,
    },
    update: {
      PH1: values.PH1,
      PH2: values.PH2,
      assignment: values.assignment,
      IA: values.PH1 + values.PH2 + values.assignment,
      finals: values.finals,
      overall: values.PH1 + values.PH2 + values.assignment + values.finals,
      graderId: subject.teacherId,
    },
  });

  return result;
}
