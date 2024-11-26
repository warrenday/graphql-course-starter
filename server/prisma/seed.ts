import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create users
  const regularUser = await prisma.user.create({
    data: {
      email: "user@example.com",
      password: "password123", // In production, this should be hashed
      name: "John Doe",
      role: "USER",
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: "password123", // In production, this should be hashed
      name: "Admin User",
      role: "ADMIN",
    },
  });

  // Create companies
  const companies = await Promise.all([
    prisma.company.create({ data: { name: "Google" } }),
    prisma.company.create({ data: { name: "Microsoft" } }),
    prisma.company.create({ data: { name: "Apple" } }),
    prisma.company.create({ data: { name: "Meta" } }),
    prisma.company.create({ data: { name: "Amazon" } }),
  ]);

  // Create jobs
  await Promise.all([
    // Google Jobs
    prisma.job.create({
      data: {
        title: "Senior Software Engineer",
        location: "Mountain View, CA",
        description: "Join our team to work on cutting-edge technology",
        type: "FULL_TIME",
        remote: false,
        salary: 180000,
        companyId: companies[0].id,
        ownerId: adminUser.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "Product Manager",
        location: "New York, NY",
        description: "Lead product development for Google Cloud",
        type: "FULL_TIME",
        remote: false,
        salary: 160000,
        companyId: companies[0].id,
        ownerId: adminUser.id,
      },
    }),

    // Microsoft Jobs
    prisma.job.create({
      data: {
        title: "Frontend Developer",
        location: "Remote",
        description: "Work on Microsoft Teams frontend",
        type: "FULL_TIME",
        remote: true,
        salary: 140000,
        companyId: companies[1].id,
        ownerId: adminUser.id,
      },
    }),

    // Apple Jobs
    prisma.job.create({
      data: {
        title: "iOS Developer",
        location: "Cupertino, CA",
        description: "Build next-generation iOS applications",
        type: "FULL_TIME",
        remote: false,
        salary: 170000,
        companyId: companies[2].id,
        ownerId: adminUser.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "UX Designer",
        location: "Cupertino, CA",
        description: "Design beautiful user experiences for Apple products",
        type: "FULL_TIME",
        remote: false,
        salary: 150000,
        companyId: companies[2].id,
        ownerId: adminUser.id,
      },
    }),

    // Meta Jobs
    prisma.job.create({
      data: {
        title: "React Developer",
        location: "Remote",
        description: "Work on React and React Native core",
        type: "FULL_TIME",
        remote: true,
        salary: 160000,
        companyId: companies[3].id,
        ownerId: adminUser.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "ML Engineer",
        location: "Menlo Park, CA",
        description: "Build ML models for content recommendation",
        type: "FULL_TIME",
        remote: false,
        salary: 190000,
        companyId: companies[3].id,
        ownerId: adminUser.id,
      },
    }),

    // Amazon Jobs
    prisma.job.create({
      data: {
        title: "Backend Developer",
        location: "Seattle, WA",
        description: "Build scalable backend services",
        type: "FULL_TIME",
        remote: false,
        salary: 155000,
        companyId: companies[4].id,
        ownerId: adminUser.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "DevOps Engineer",
        location: "Remote",
        description: "Manage AWS infrastructure and deployments",
        type: "FULL_TIME",
        remote: true,
        salary: 145000,
        companyId: companies[4].id,
        ownerId: adminUser.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "Summer Intern",
        location: "Seattle, WA",
        description: "3-month summer internship program",
        type: "INTERNSHIP",
        remote: false,
        salary: 8000,
        companyId: companies[4].id,
        ownerId: adminUser.id,
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
