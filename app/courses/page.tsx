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

  return <DataTable columns={columns} data={courses} type="course" toolbar />;
}
