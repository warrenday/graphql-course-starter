import { PrismaClient } from "@prisma/client";
import { YogaInitialContext } from "graphql-yoga";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key"; // In production, always use environment variable

export interface Context {
  prisma: PrismaClient;
  auth: {
    user: { id: string };
    login: (userId: string) => void;
  };
}

const createContext = async (initialContext?: YogaInitialContext) => {
  const token = await initialContext?.request.cookieStore?.get("token");
  const userId = token ? jwt.verify(token.value, JWT_SECRET) : null;

  return {
    prisma: new PrismaClient(),
    auth: {
      user: { id: userId },
      login: (userId: string) => {
        const token = jwt.sign({ userId }, JWT_SECRET);
        initialContext?.request.cookieStore?.set({
          name: "token",
          value: token,
          domain: "localhost",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
      },
    },
  };
};

export default createContext;
