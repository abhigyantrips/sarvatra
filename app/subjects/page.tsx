import { db } from '@/lib/db';

import { columns } from '@/app/subjects/columns';
import { DataTable } from '@/app/subjects/data-table';

async function getSubjects(courseCode: string) {
  const subjects = await db.subject.findMany({
    include: {
      courses: true,
      teacher: true,
    },
    where: {
      courses: {
        some: {
          courseCode,
        },
      },
    },
    orderBy: {
      subjectCode: 'asc',
    },
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
