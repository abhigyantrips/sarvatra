'use client';

import type { Course } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'courseCode',
    header: 'Code',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'semesters',
    header: 'Semesters',
  },
  {
    accessorKey: 'credits',
    header: 'Credits',
  },
  {
    accessorKey: 'total',
    header: 'Total',
  },
];
