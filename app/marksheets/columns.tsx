'use client';

import type { Prisma } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

import { getLetterGrade } from '@/lib/getLetterGrade';

type ResultWithStudent = Prisma.ResultGetPayload<{
  include: { student: true };
}>;

export const columns: ColumnDef<ResultWithStudent>[] = [
  {
    id: 'icNo',
    accessorFn: (row) => `${row.student.icNo}`,
    header: 'IC No.',
  },
  {
    id: 'rank',
    accessorFn: (row) => (row.student.rank ? `${row.student.rank}` : '-'),
    header: 'Rank',
  },
  {
    id: 'name',
    accessorFn: (row) => `${row.student.firstName} ${row.student.lastName}`,
    header: 'Name',
  },
  {
    accessorKey: 'PH1',
    header: 'PH1 (20)',
  },
  {
    accessorKey: 'PH2',
    header: 'PH2 (20)',
  },
  {
    accessorKey: 'assignment',
    header: 'Assignment (10)',
  },
  {
    accessorKey: 'finals',
    header: 'Finals (50)',
  },
  {
    accessorKey: 'overall',
    header: 'Total',
    cell: ({ row }) => {
      return <b>{row.original.overall}</b>;
    },
  },
  {
    accessorKey: 'letterGrade',
    header: 'Letter Grade',
    cell: ({ row }) => {
      return <b>{getLetterGrade(row.original.overall) ?? 'ND'}</b>;
    },
  },
];
