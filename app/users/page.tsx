import { fetchUsers } from '@/lib/fetchUsers';

import { columns } from '@/app/users/columns';
import { DataTable } from '@/app/users/data-table';

export default async function Users() {
  const users = await fetchUsers();

  return <DataTable columns={columns} data={users} type="user" toolbar />;
}
