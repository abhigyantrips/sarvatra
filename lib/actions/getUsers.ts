'use server';

import type { Role } from '@prisma/client';

import { db } from '@/lib/db';

export async function getUsers({ role }: { role?: Role }) {
  const users = await db.user.findMany({
    select: {
      aadharNo: false,
      panNo: false,
      password: false,
    },
    where: {
      role,
    },
  });
}
