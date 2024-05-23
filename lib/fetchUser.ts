'use server';

import { db } from './db';

export async function fetchUser(icNo: string) {
  const user = await db.user.findUnique({
    where: {
      icNo,
    },
  });

  return user;
}
