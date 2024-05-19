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
    accessorKey: 'credits',
    header: 'Credits',
  },
  {
    accessorKey: 'semesters',
    header: 'Semesters',
  },
  {
    accessorKey: 'total',
    header: 'Total',
  },
];
