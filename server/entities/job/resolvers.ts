import { z } from "zod";
import type { IResolvers } from "../../types/resolvers-types";
import { GraphQLError } from "graphql";

const createJobSchema = z.object({
  title: z.string(),
  location: z.string(),
  description: z.string(),
  type: z.string(),
  remote: z.boolean(),
  salary: z.number().min(1),
  companyName: z.string(),
});

const resolvers: IResolvers = {
  Job: {
    officeAddress: (job) => {
      if (job.remote) {
        return null;
      }

      return job.location.includes("UK")
        ? {
            addressLine1: "12 Almond Crescent",
            addressLine2: "Balham",
            city: "London",
            postcode: "SW12 9AB",
          }
        : {
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            zip: "10001",
          };
    },
    company: async (job, args, context) => {
      const company = await context.prisma.company.findUnique({
        where: { id: job.companyId },
      });

      if (!company) {
        throw new Error("Company not found");
      }

      return company;
    },
    isApplied: async (job, args, context) => {
      const isApplied = await context.dataloaders.isAppliedForJob.load(job.id);
      return isApplied;
    },
  },
  Subscription: {
    jobCreated: {
      subscribe: (root, args, context) => {
        return context.pubSub.asyncIterableIterator("JOB_CREATED");
      },
    },
  },
  Query: {
    searchJobs: async (root, args, context) => {
      const { query } = args.input;

      throw new GraphQLError("another error");

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
        type: job.type,
      }));
    },
  },
  Mutation: {
    createJob: async (root, args, context) => {
      const {
        title,
        location,
        description,
        type,
        remote,
        salary,
        companyName,
      } = args.input;

      createJobSchema.parse(args.input);

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
              id: context.auth.user?.id,
            },
          },
        },
      });

      context.pubSub.publish("JOB_CREATED", {
        jobCreated: job,
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
