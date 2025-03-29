import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
const saltRounds = 8;

const prisma = new PrismaClient();

const userData: (Prisma.AuthCreateInput & { password: string })[] = [
  {
    username: 'Alice',
    email: 'alice@prisma.io',
    profilePublicId: '',
    browserName: '',
    country: '',
    deviceType: '',
    password: '12345678',
    profilePicture: '',
    emailVerified: true,
  },
  {
    username: 'Nilu',
    email: 'nilu@prisma.io',
    profilePublicId: '',
    browserName: '',
    country: '',
    deviceType: '',
    password: '12345678',
    profilePicture: '',
    emailVerified: true,
  },
  {
    username: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    profilePublicId: '',
    browserName: '',
    country: '',
    deviceType: '',
    password: '12345678',
    profilePicture: '',
    emailVerified: true,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const { password, ...u } of userData) {
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await prisma.auth.create({
      data: {
        ...u,
        password: {
          create: { hash },
        },
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
