'use server';

import { db } from '@/lib/db';

export async function fetchCourses() {
  const courses = await db.course.findMany({});
}
