'use client';

import type { Prisma } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

type SubjectWithCourse = Prisma.SubjectGetPayload<{
  include: { courses: true };
}>;

export const columns: ColumnDef<SubjectWithCourse>[] = [
  {
    id: 'courseCode',
    accessorFn: (row) => `${row.courses[0].courseCode}`,
    header: 'Course Code',
  },
  {
    accessorKey: 'subjectCode',
    header: 'Subject Code',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'semester',
    header: 'Semester',
  },
];
