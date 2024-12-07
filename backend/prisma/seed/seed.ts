import { notes } from './notes';
import { quotes } from './quotes';
import { PrismaClient } from '@prisma/client';
import { sleepRecords } from './sleep-records';
import { articles } from './articles';
import { users } from './users';
import { articleCategories } from './article-categories';

const prisma = new PrismaClient();

export async function seedDb() {
  try {
    await prisma.user.deleteMany(),
    await prisma.user.createMany({
      data: users,
    })
  } catch {
    console.log('Users already exist')
  }
  await prisma.sleepRecord.deleteMany();
  await  prisma.sleepRecord.createMany({
    data: sleepRecords,
  });
  await prisma.articleCategory.deleteMany();
  await  prisma.articleCategory.createMany({
    data: articleCategories,
  });
  await prisma.article.deleteMany();
  await  prisma.article.createMany({
    data: articles,
  });
  await prisma.note.deleteMany();
  await  prisma.note.createMany({
    data: notes,
  });
  await prisma.quote.deleteMany();
  await  prisma.quote.createMany({
    data: quotes,
  });
}
seedDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });