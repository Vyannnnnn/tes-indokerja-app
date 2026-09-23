import { PrismaClient, Role, JobType } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/indokerja?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('SEED STARTED');

  const hash = (p: string) => bcrypt.hashSync(p, 10);

  const seeker = await prisma.user.upsert({
    where: {
      email: 'seeker@test.com'
    },
    update: {},
    create: {
      email: 'seeker@test.com',
      password: hash('password123'),
      name: 'Andre Seeker',
      role: Role.JOB_SEEKER
    }
  });

  const company = await prisma.user.upsert({
    where: {
      email: 'company@test.com'
    },
    update: {},
    create: {
      email: 'company@test.com',
      password: hash('password123'),
      name: 'PT Posdigi',
      role: Role.COMPANY
    }
  });

  await prisma.job.createMany({
    data: [
      {
        title: 'Frontend Developer',
        description: 'Build React apps',
        company: 'PT Posdigi',
        location: 'Bandung',
        salary: 'Rp 8-12jt',
        jobType: JobType.FULL_TIME,
        companyId: company.id
      },
      {
        title: 'Backend Engineer',
        description: 'Build REST API',
        company: 'PT Posdigi',
        location: 'Jakarta',
        salary: 'Rp 9-13jt',
        jobType: JobType.FULL_TIME,
        companyId: company.id
      },
      {
        title: 'Full Stack Developer',
        description: 'React + Node',
        company: 'PT Posdigi',
        location: 'Remote',
        salary: 'Rp 10-15jt',
        jobType: JobType.CONTRACT,
        companyId: company.id
      }
    ]
  });

  console.log('Seeded:', {
    seeker: seeker.email,
    company: company.email
  });
}

main()
  .then(async () => {
    console.log('SEED FINISHED');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('SEED ERROR:', error);
    await prisma.$disconnect();
    process.exit(1);
  });