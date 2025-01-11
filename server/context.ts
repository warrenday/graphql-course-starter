import { PrismaClient, Job } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { PubSub } from "graphql-subscriptions";
import createDataloaders from "./dataloaders";
const JWT_SECRET = "your-secret-key"; // In production, always use environment variable

const pubSub = new PubSub<{
  JOB_CREATED: {
    jobCreated: Job;
  };
}>();

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  auth: {
    user: { id: string; isAdmin: boolean } | null;
    login: (args: { id: string; isAdmin: boolean }) => void;
    logout: () => void;
  };
  dataloaders: ReturnType<typeof createDataloaders>;
  pubSub: typeof pubSub;
}

const parseToken = (token: string) => {
  const parsedToken = token ? jwt.verify(token, JWT_SECRET) : null;
  if (!parsedToken) {
    return null;
  }

  const payload = z
    .object({
      id: z.string(),
      isAdmin: z.boolean(),
    })
    .safeParse(parsedToken);

  return payload.success ? payload.data : null;
};

const createContext = async (ctx?: { req: Request; res: Response }) => {
  const token = ctx?.req.cookies?.token;
  const user = parseToken(token);

  return {
    prisma,
    auth: {
      user,
      login: (args: { id: string; isAdmin: boolean }) => {
        const token = jwt.sign(args, JWT_SECRET);
        ctx?.res.cookie("token", token, {
          domain: "localhost",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        });
      },
      logout: () => {
        ctx?.res.clearCookie("token");
      },
    },
    dataloaders: createDataloaders({
      prisma,
      userId: user?.id,
    }),
    pubSub,
  };
};

export default createContext;
