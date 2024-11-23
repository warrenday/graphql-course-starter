import type { Resolvers, JobType } from "../../types/resolvers-types";

const resolvers: Resolvers = {
  Job: {
    company: async (job, args, context) => {
      const company = await context.prisma.company.findUnique({
        where: { id: job.companyId },
      });

      if (!company) {
        throw new Error("Company not found");
      }

      return company;
    },
  },
  Query: {
    searchJobs: async (root, args, context) => {
      const { query } = args.input;

      const jobs = await context.prisma.job.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { location: { contains: query } },
          ],
        },
      });

      return jobs.map((job) => ({
        ...job,
        type: job.type as JobType,
      }));
    },
  },
  Mutation: {
    createJob: async (root, args, context) => {
      if (!context.auth.user?.isAdmin) {
        throw new Error("Unauthorized");
      }

      const {
        title,
        location,
        description,
        type,
        remote,
        salary,
        companyName,
      } = args.input;

      const job = await context.prisma.job.create({
        data: {
          title,
          location,
          description,
          type,
          remote,
          salary,
          company: {
            create: {
              name: companyName,
            },
          },
          owner: {
            connect: {
              id: context.auth.user.id,
            },
          },
        },
      });

      return job;
    },
    deleteJob: async (root, args, context) => {
      if (!context.auth.user?.isAdmin) {
        throw new Error("Unauthorized");
      }

      await context.prisma.job.delete({
        where: { id: args.input.id, ownerId: context.auth.user.id },
      });

      return true;
    },
    applyForJob: async (root, args, context) => {
      if (!context.auth.user) {
        throw new Error("Unauthorized");
      }

      await context.prisma.job.update({
        where: { id: args.input.id },
        data: {
          applicants: {
            connect: {
              id: context.auth.user.id,
            },
          },
        },
      });

      return true;
    },
    cancelApplication: async (root, args, context) => {
      if (!context.auth.user) {
        throw new Error("Unauthorized");
      }

      await context.prisma.job.update({
        where: { id: args.input.id },
        data: { applicants: { disconnect: { id: context.auth.user.id } } },
      });

      return true;
    },
  },
};

export default resolvers;
