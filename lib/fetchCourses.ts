'use server';

import { db } from './db';

export async function fetchCourses() {
  const courses = await db.course.findMany({});
}
