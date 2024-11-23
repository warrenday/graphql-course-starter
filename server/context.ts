import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key"; // In production, always use environment variable

export interface Context {
  prisma: PrismaClient;
  auth: {
    user: { id: string };
    login: (userId: string) => void;
    logout: () => void;
  };
}

const createContext = async ({ req, res }: { req: Request; res: Response }) => {
  const token = req.cookies?.token;
  const userId = token ? jwt.verify(token, JWT_SECRET) : null;

  return {
    prisma: new PrismaClient(),
    auth: {
      user: { id: userId },
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
