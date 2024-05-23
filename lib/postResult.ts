'use server';

import { Subject, User } from '@prisma/client';

import { db } from './db';

export async function postResult(user: User, subject: Subject, values: any) {
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
    },
    update: {
      PH1: values.PH1,
      PH2: values.PH2,
      assignment: values.assignment,
      IA: values.PH1 + values.PH2 + values.assignment,
      finals: values.finals,
      overall: values.PH1 + values.PH2 + values.assignment + values.finals,
    },
  });

  return result;
}
