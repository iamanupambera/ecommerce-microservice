import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const reviewData: Prisma.ReviewCreateInput[] = [];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of reviewData) {
    const user = await prisma.review.create({
      data: {
        ...u,
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
