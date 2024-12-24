import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const clearDatabase = async () => {
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
};
