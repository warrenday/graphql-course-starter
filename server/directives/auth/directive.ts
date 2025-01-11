import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { Context } from "../../context";
import { IUserRole } from "../../types/resolvers-types";

function authDirective(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        const requiredRole = authDirective.role as IUserRole;

        fieldConfig.resolve = async function (
          source,
          args,
          context: Context,
          info
        ) {
          const user = context.auth.user;

          // Check if user is authenticated
          if (!user) {
            throw new Error("Not authenticated");
          }

          // For ADMIN role, user must be admin
          if (requiredRole === IUserRole.Admin && !user.isAdmin) {
            throw new Error("Not authorized - Admin access required");
          }

          return resolve(source, args, context, info);
        };
      }

      return fieldConfig;
    },
  });
}

export default authDirective;
