import { ApolloServerPlugin } from "@apollo/server";
import { GraphQLError } from "graphql";
import * as Sentry from "@sentry/node";
import { Context } from "../context";

const sentryPlugin: ApolloServerPlugin<Context> = {
  async requestDidStart() {
    return {
      async didEncounterErrors({ errors, operationName, request }) {
        for (const error of errors) {
          const originalError = error.originalError;

          if (originalError instanceof GraphQLError) {
            return;
          }

          Sentry.withScope((scope) => {
            scope.setTag("operationName", operationName || "unknown");
            scope.setExtra("query", request.query);
            scope.setExtra("variables", request.variables);
            scope.setLevel("error");
            Sentry.captureException(originalError);
          });
        }
      },
    };
  },
};

export default sentryPlugin;
