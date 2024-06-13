import { redirect } from 'next/navigation';

import { fetchMarksheet } from '@/lib/fetchMarksheet';
import { fetchSubject } from '@/lib/fetchSubject';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { columns } from '@/app/marks/columns';

export default async function Marksheets({
  searchParams,
}: {
  searchParams: { subjectCode: string };
}) {
  if (!searchParams.subjectCode) {
    redirect('/subjects');
  }

  const subject = await fetchSubject(searchParams.subjectCode);
  const result = await fetchMarksheet(searchParams.subjectCode);

  return (
    <div className="space-y-6 py-10">
      <div className="flex flex-row justify-between space-y-0.5 border-b pb-6">
        <div>
          <h2 className="text-2xl tracking-tight">
            <span className="font-bold">{subject?.subjectCode}</span>
          </h2>
          <p className="text-muted-foreground">{subject?.name}</p>
        </div>
        <Button>Save</Button>
      </div>
      <DataTable
        columns={columns}
        data={result}
        type="result"
        toolbar={false}
      />
    </div>
  );
}
