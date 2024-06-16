import { redirect } from 'next/navigation';

import { fetchResults } from '@/lib/fetchResults';
import { fetchSubject } from '@/lib/fetchSubject';

import { Badge } from '@/components/ui/badge';

import { columns } from '@/app/marks/columns';
import { DataTable } from '@/app/marks/data-table';

export default async function Marksheets({
  searchParams,
}: {
  searchParams: { subjectCode: string };
}) {
  if (!searchParams.subjectCode) {
    redirect('/subjects');
  }

  const subject = await fetchSubject(searchParams.subjectCode);

  if (!subject) {
    redirect('/subjects');
  }

  const results = await fetchResults(subject);

  return (
    <div className="space-y-6 py-10">
      <div className="flex flex-row items-end justify-between space-y-0.5 border-b pb-6">
        <div>
          <h2 className="text-2xl tracking-tight">
            <span className="font-bold">{subject?.subjectCode}</span>
          </h2>
          <p className="text-muted-foreground">{subject?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="secondary">
            Course:{' '}
            {subject?.courses
              .map((course) => {
                return course.courseCode;
              })
              .join(', ')}
          </Badge>
          <Badge variant="secondary">Semester: {subject?.semester}</Badge>
          <Badge variant="secondary">Credits: {subject?.credits}</Badge>
        </div>
      </div>
      <DataTable
        columns={columns}
        defaultData={results}
        type="result"
        toolbar={false}
      />
    </div>
  );
}
