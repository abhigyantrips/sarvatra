'use client';

import type { Prisma } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

type SubjectWithCourse = Prisma.SubjectGetPayload<{
  include: { courses: true; teacher: true };
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
    id: 'teacher',
    header: 'Teacher',
    cell: ({ row }) => {
      const ogRow = row.original;

      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="px-0 py-0">
              {ogRow.teacher
                ? `${ogRow.teacher.rank ?? ''} ${ogRow.teacher.firstName} ${ogRow.teacher.lastName}`
                : '-'}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="space-y-1">
            {ogRow.teacher ? (
              <>
                <div>
                  <b>ID: </b>
                  {ogRow.teacher.icNo}
                </div>
                <div>
                  <b>Email: </b>
                  {ogRow.teacher.email}
                </div>
              </>
            ) : (
              <div>No information found.</div>
            )}
          </HoverCardContent>
        </HoverCard>
      );
    },
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
