import type { Resolvers, JobType } from "../../types/resolvers-types";

const resolvers: Resolvers = {
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
};

export default resolvers;
