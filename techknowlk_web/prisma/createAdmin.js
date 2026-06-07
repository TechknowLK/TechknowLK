import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function addAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword
    }
  });
  console.log("Admin user created/verified: username 'admin', password 'admin123'");
}

addAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
