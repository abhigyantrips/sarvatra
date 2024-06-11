import { Plus } from 'lucide-react';

import Link from 'next/link';

import { db } from '@/lib/db';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';

import { columns } from '@/app/subjects/columns';

async function getSubjects() {
  const subjects = await db.subject.findMany({
    include: {
      course: true,
    },
    orderBy: [
      {
        course: {
          courseCode: 'asc',
        },
      },
      {
        subjectCode: 'asc',
      },
    ],
  });

  return subjects;
}

export default async function Subjects() {
  const subjects = await getSubjects();

  return <DataTable columns={columns} data={subjects} type="subject" toolbar />;
}
