import { buildClientSchema, graphql, printSchema } from "graphql";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import schemaJson from "../types/schema.json";

const typeDefs = printSchema(buildClientSchema(schemaJson as any));
const schema = makeExecutableSchema({ typeDefs });
const schemaWithMocks = addMocksToSchema({ schema });

const query = /* GraphQL */ `
  query SearchJobs($input: SearchJobsInput!) {
    searchJobs(input: $input) {
      id
      title
      company {
        name
      }
      isApplied
    }
  }
`;

graphql({
  schema: schemaWithMocks,
  source: query,
  variableValues: {
    input: {
      query: "",
    },
  },
}).then((result) => console.log(JSON.stringify(result, null, 2)));
