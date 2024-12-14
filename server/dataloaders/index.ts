import createIsAppliedForJobDataloader from "./isAppliedForJobDataloader";
import { PrismaClient } from "@prisma/client";

export interface DataloaderArgs {
  prisma: PrismaClient;
  userId?: string;
}

const createDataloaders = (args: DataloaderArgs) => {
  return {
    isAppliedForJob: createIsAppliedForJobDataloader(args),
  };
};

export default createDataloaders;
