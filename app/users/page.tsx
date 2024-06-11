import { db } from '@/lib/db';

import { DataTable } from '@/components/ui/data-table';

import { columns } from '@/app/users/columns';

async function getUsers() {
  const users = await db.user.findMany({});

  return users;
}

export default async function Users() {
  const users = await getUsers();

  return <DataTable columns={columns} data={users} type="user" toolbar />;
}
