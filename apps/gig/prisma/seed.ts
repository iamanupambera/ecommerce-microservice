import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data: Prisma.GigCreateInput[] = [];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of data) {
    const gig = await prisma.gig.create({
      data: {
        ...u,
      },
    });
    console.log(`Created gig with id: ${gig.id}`);
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
