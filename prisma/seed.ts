import { Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

async function main() {
  console.log('Seeding database...');

  // Create default admin user
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@clinic.com' },
    update: {},
    create: {
      email: 'admin@clinic.com',
      name: 'System Admin',
      password: adminPasswordHash,
      role: Role.ADMIN,
    },
  });
  console.log('Admin user created/updated:', admin.email);

  // Create default staff user
  const staffPasswordHash = await bcrypt.hash('staff123', 10);
  const staff = await prisma.user.upsert({
    where: { email: 'staff@clinic.com' },
    update: {},
    create: {
      email: 'staff@clinic.com',
      name: 'Clinic Staff',
      password: staffPasswordHash,
      role: Role.STAFF,
    },
  });
  console.log('Staff user created/updated:', staff.email);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
