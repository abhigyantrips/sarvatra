import { db } from '@/lib/db';

import { DataTable } from '@/components/ui/data-table';

import { columns } from '@/app/subjects/columns';

async function getSubjects(courseCode: string) {
  const subjects = await db.subject.findMany({
    include: {
      course: true,
    },
    where: { course: { courseCode } },
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

export default async function Subjects({
  searchParams,
}: {
  searchParams: { courseCode: string };
}) {
  const subjects = await getSubjects(searchParams.courseCode);

  return <DataTable columns={columns} data={subjects} type="subject" toolbar />;
}
