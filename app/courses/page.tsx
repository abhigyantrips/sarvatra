import { Plus } from 'lucide-react';

import Link from 'next/link';

import { db } from '@/lib/db';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';

import { columns } from '@/app/courses/columns';

async function getCourses() {
  const courses = await db.course.findMany({});

  return courses;
}

export default async function Courses() {
  const courses = await getCourses();

  return (
    <div className="space-y-6 py-10">
      <div className="flex flex-row items-center justify-between space-y-0.5 border-b pb-6">
        <Input
          className="max-w-sm"
          placeholder="Search and filter courses..."
        />
        <Button variant="outline" asChild>
          <Link href="/subjects/add">
            <Plus className="mr-2 h-5 w-5" />
            Add Course
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
