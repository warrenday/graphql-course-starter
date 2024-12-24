import DataLoader from "dataloader";
import { IDataloaderArgs } from "./index";

const createIsAppliedForJobDataloader = (args: IDataloaderArgs) => {
  const { prisma, userId } = args;
  return new DataLoader(async (keys: readonly string[]) => {
    const counts = await prisma.job.findMany({
      where: {
        id: { in: keys as string[] },
        applicants: { some: { id: userId } },
      },
      select: { id: true },
    });

    const countSet = new Set(counts.map((count) => count.id));

    return keys.map((key) => countSet.has(key));
  });
};

export default createIsAppliedForJobDataloader;
