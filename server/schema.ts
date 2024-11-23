import "graphql-import-node";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  resolvers as userResolvers,
  typeDefs as userTypeDefs,
} from "./entities/user";
import {
  resolvers as jobResolvers,
  typeDefs as jobTypeDefs,
} from "./entities/job";
import {
  resolvers as companyResolvers,
  typeDefs as companyTypeDefs,
} from "./entities/company";
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from "./scalars";

const schema = makeExecutableSchema({
  typeDefs: [scalarTypeDefs, userTypeDefs, jobTypeDefs, companyTypeDefs],
  resolvers: {
    ...scalarResolvers,
    ...userResolvers,
    ...jobResolvers,
    ...companyResolvers,
  },
});

export default schema;
