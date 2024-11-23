import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
const JWT_SECRET = "your-secret-key"; // In production, always use environment variable

export interface Context {
  prisma: PrismaClient;
  auth: {
    user: { id: string } | null;
    login: (userId: string) => void;
    logout: () => void;
  };
}

const parseToken = (token: string) => {
  const parsedToken = token ? jwt.verify(token, JWT_SECRET) : null;
  if (!parsedToken) {
    return null;
  }

  const payload = z
    .object({
      userId: z.string(),
    })
    .parse(parsedToken);

  return payload.userId;
};

const createContext = async ({ req, res }: { req: Request; res: Response }) => {
  const token = req.cookies?.token;
  const userId = parseToken(token);

  return {
    prisma: new PrismaClient(),
    auth: {
      user: userId ? { id: userId } : null,
      login: (userId: string) => {
        const token = jwt.sign({ userId }, JWT_SECRET);
        res.cookie("token", token, {
          domain: "localhost",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        });
      },
      logout: () => {
        res.clearCookie("token");
      },
    },
  };
};

export default createContext;
