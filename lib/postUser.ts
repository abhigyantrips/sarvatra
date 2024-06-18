'use server';

import { hash } from 'bcryptjs';

import { db } from './db';

export async function postUser(values: any) {
  const password = await hash(values.password, 12);

  await db.user.upsert({
    where: {
      icNo: values.icNo,
    },
    create: {
      email: values.email,
      phoneNo: values.phoneNo,
      aadharNo: values.aadharNo,
      panNo: values.panNo,
      icNo: values.icNo,
      rank: values.rank,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
      password,
    },
    update: {
      email: values.email,
      phoneNo: values.phoneNo,
      aadharNo: values.aadharNo,
      panNo: values.panNo,
      rank: values.rank,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
      password,
    },
  });
}
