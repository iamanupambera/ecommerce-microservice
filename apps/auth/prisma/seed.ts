import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.AuthCreateInput[] = [
  {
    username: 'Alice',
    email: 'alice@prisma.io',
    profilePublicId: '',
    browserName: '',
    country: '',
    deviceType: '',
    password: '',
    profilePicture: '',
  },
  {
    username: 'Nilu',
    email: 'nilu@prisma.io',
    profilePublicId: '',
    browserName: '',
    country: '',
    deviceType: '',
    password: '',
    profilePicture: '',
  },
  {
    username: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    profilePublicId: '',
    browserName: '',
    country: '',
    deviceType: '',
    password: '',
    profilePicture: '',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.auth.create({
      data: u,
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
