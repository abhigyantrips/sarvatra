import { fetchUsers } from '@/lib/fetchUsers';

import { DataTable } from '@/components/ui/data-table';

import { columns } from '@/app/users/columns';

export default async function Users() {
  const users = await fetchUsers();

  return <DataTable columns={columns} data={users} type="user" toolbar />;
}
