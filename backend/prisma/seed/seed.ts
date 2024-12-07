import { notes } from './notes';
import { quotes } from './quotes';
import { PrismaClient } from '@prisma/client';
import { sleepRecords } from './sleep-records';

const prisma = new PrismaClient();

export async function seedDb() {
    console.log(sleepRecords);
  await prisma.sleepRecord.deleteMany();
  await  prisma.sleepRecord.createMany({
    data: sleepRecords,
  });
    console.log(notes);
  await prisma.note.deleteMany();
  await  prisma.note.createMany({
    data: notes,
  });
    console.log(quotes);
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