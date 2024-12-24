import { ApolloServer } from "@apollo/server";
import { Request, Response } from "express";
import { merge } from "lodash";
import schema from "../schema";
import createContext, { Context } from "../context";
import { DeepPartial } from "../types/common";

const mockRequest = {
  cookies: {},
} as Request;

const mockResponse = {
  cookie: (name: string, value: string) => {
    console.log(`Cookie set: ${name} = ${value}`);
  },
  clearCookie: (name: string) => {
    console.log(`Cookie cleared: ${name}`);
  },
} as Response;

interface ITestServerArgs {
  context?: DeepPartial<Context>;
}

export const createTestServer = (args: ITestServerArgs) => {
  const server = new ApolloServer({
    schema,
  });

  return {
    query: async (queryArgs: { query: string; variables: any }) => {
      const context = await createContext({
        req: mockRequest,
        res: mockResponse,
      });
      const contextValue = merge(context, args.context || {});

      const res = await server.executeOperation(
        {
          query: queryArgs.query,
          variables: queryArgs.variables,
        },
        {
          contextValue,
        }
      );

      if (res.body.kind === "single") {
        return res.body.singleResult;
      } else {
        throw new Error("Invalid response");
      }
    },
  };
};
