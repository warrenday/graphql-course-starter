import { setupServer } from "msw/node";
import { graphql as mswGraphql, HttpResponse } from "msw";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql, buildClientSchema, printSchema } from "graphql";
import schemaJson from "../types/schema.json";
import { QueryResolvers, MutationResolvers } from "../types/mock-resolvers";

interface IMockServerMocks {
  Query?: QueryResolvers;
  Mutation?: MutationResolvers;
}

const createMockHandlers = (mocks: IMockServerMocks = {}) => {
  const typeDefs = printSchema(buildClientSchema(schemaJson as any));
  const schema = makeExecutableSchema({ typeDefs });
  const schemaWithMocks = addMocksToSchema({
    schema,
    mocks: {
      DateTime: () => new Date().toISOString(),
      ...mocks,
    },
  });

  const handlers = [
    mswGraphql.operation(async ({ query, variables }) => {
      const { data, errors } = await graphql({
        schema: schemaWithMocks,
        source: query,
        variableValues: variables,
      });

      return HttpResponse.json<any>({
        data,
        errors,
      });
    }),
  ];

  return handlers;
};

export const createMockServer = (mocks: IMockServerMocks = {}) => {
  const handlers = createMockHandlers(mocks);
  const server = setupServer(...handlers);

  return {
    listen: () => server.listen(),
    resetHandlers: () => server.resetHandlers(),
    close: () => server.close(),
    addMocks: (nextMocks: IMockServerMocks = {}) => {
      const nextHandlers = createMockHandlers(nextMocks);
      server.use(...nextHandlers);
    },
  };
};
