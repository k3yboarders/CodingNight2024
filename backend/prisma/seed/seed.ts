import { quotes } from './quotes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDb() {
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