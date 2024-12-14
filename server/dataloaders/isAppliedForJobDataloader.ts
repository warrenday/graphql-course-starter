import DataLoader from "dataloader";
import { DataloaderArgs } from "./index";

const createIsAppliedForJobDataloader = (args: DataloaderArgs) => {
  const { prisma, userId } = args;

  return new DataLoader(async (keys: readonly string[]) => {
    const counts = await prisma.job.findMany({
      where: {
        id: { in: keys as string[] },
        applicants: { some: { id: userId } },
      },
      select: { id: true },
    });

    console.log(counts);

    const countSet = new Set(counts.map((job) => job.id));
    return keys.map((key) => countSet.has(key));
  });
};

export default createIsAppliedForJobDataloader;
