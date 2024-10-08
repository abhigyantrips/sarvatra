'use client';

import type { User } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'icNo',
    header: 'IC Number',
  },
  {
    id: 'rank',
    accessorFn: (row) => {
      return row.rank ? `${row.rank}` : '-';
    },
    header: 'Rank',
  },
  {
    id: 'name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: 'Name',
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone Number',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
];
