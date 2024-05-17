'use server';

import { db } from '@/lib/db';

export async function getCourses() {
  const courses = await db.course.findMany();

  return courses;
}
