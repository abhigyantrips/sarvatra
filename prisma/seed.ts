import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.upsert({
    where: { courseCode: '123456' },
    update: {},
    create: {
      courseCode: '',
      name: '',
      semesters: 0,
      credits: 0,
      // total = 40 * credits
      total: 0,
    },
  });
  console.log({ course });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
