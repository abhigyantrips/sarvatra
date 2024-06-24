'use server';

import { db } from './db';

export async function fetchUsers() {
  const users = await db.user.findMany({
    orderBy: [
      {
        icNo: 'asc',
      },
      {
        firstName: 'asc',
      },
    ],
  });

  return users;
}
