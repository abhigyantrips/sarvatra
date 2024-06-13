import { db } from '@/lib/db';

import { columns } from '@/app/courses/columns';
import { DataTable } from '@/app/courses/data-table';

async function getCourses() {
  const courses = await db.course.findMany({});

  return courses;
}

export default async function Courses() {
  const courses = await getCourses();

  return <DataTable columns={columns} data={courses} type="course" toolbar />;
}
