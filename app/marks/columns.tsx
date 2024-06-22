'use client';

import type { Prisma } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

import { getLetterGrade } from '@/lib/getLetterGrade';

type StudentWithResults = Prisma.UserGetPayload<{
  include: { course: true; testResults: true };
}>;

export const columns: ColumnDef<StudentWithResults>[] = [
  {
    accessorKey: 'icNo',
    header: 'IC No.',
  },
  {
    id: 'rank',
    accessorFn: (row) => (row.rank ? `${row.rank}` : '-'),
    header: 'Rank',
  },
  {
    id: 'name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: 'Name',
  },
  {
    id: 'PH1',
    accessorFn: (row) => `${row.testResults[0] ? row.testResults[0].PH1 : '-'}`,
    header: 'PH1 (20)',
  },
  {
    id: 'PH2',
    accessorFn: (row) => `${row.testResults[0] ? row.testResults[0].PH2 : '-'}`,
    header: 'PH2 (20)',
  },
  {
    id: 'assignment',
    accessorFn: (row) =>
      `${row.testResults[0] ? row.testResults[0].assignment : '-'}`,
    header: 'Assignment (10)',
  },
  {
    id: 'finals',
    accessorFn: (row) =>
      `${row.testResults[0] ? row.testResults[0].finals : '-'}`,
    header: 'Finals (50)',
  },
  {
    id: 'overall',
    header: 'Total',
    cell: ({ row }) => {
      return (
        <b>
          {row.original.testResults[0]
            ? row.original.testResults[0].overall
            : '-'}
        </b>
      );
    },
  },
  {
    accessorKey: 'letterGrade',
    header: 'Letter Grade',
    cell: ({ row }) => {
      return (
        <b>
          {row.original.testResults[0]
            ? getLetterGrade(row.original.testResults[0].overall)
            : 'ND'}
        </b>
      );
    },
  },
];
