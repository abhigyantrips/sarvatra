'use server';

import { db } from './db';

export async function fetchUsers() {
  const users = await db.user.findMany({
    orderBy: {
      firstName: 'asc',
    },
  });

  return users;
}
