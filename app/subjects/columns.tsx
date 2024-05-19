'use client';

import type { Subject } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Subject>[] = [
  {
    accessorKey: 'subjectCode',
    header: 'Code',
  },
  {
    accessorKey: 'courseId',
    header: 'Course ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'semester',
    header: 'Semester',
  },
  {
    accessorKey: 'credits',
    header: 'Credits',
  },
];
