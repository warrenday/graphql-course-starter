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
  resolvers as addressResolvers,
  typeDefs as addressTypeDefs,
} from "./entities/address";
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from "./scalars";

// Directives
import {
  typeDefs as authDirectiveTypeDefs,
  directive as authDirective,
} from "./directives/auth";
import { typeDefs as apolloDirectiveTypeDefs } from "./directives/apollo";

const schema = makeExecutableSchema({
  typeDefs: [
    scalarTypeDefs,
    userTypeDefs,
    jobTypeDefs,
    companyTypeDefs,
    addressTypeDefs,
    authDirectiveTypeDefs,
    apolloDirectiveTypeDefs,
  ],
  resolvers: [
    scalarResolvers,
    userResolvers,
    jobResolvers,
    companyResolvers,
    addressResolvers,
  ],
});

const schemaWithDirectives = authDirective(schema);

export default schemaWithDirectives;
