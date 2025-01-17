/* eslint-disable react-hooks/rules-of-hooks */

import "./instrument";
import * as Sentry from "@sentry/node";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import schema from "./schema";
import createContext from "./context";
import { GraphQLError } from "graphql";
import { ZodError } from "zod";
import sentryPlugin from "./plugins/sentryPlugin";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";

const app = express();
const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const server = new ApolloServer({
  schema,
  plugins: [
    sentryPlugin,
    ApolloServerPluginCacheControl({ defaultMaxAge: 60 }),
  ],
  formatError: (formattedError, error) => {
    if (error instanceof GraphQLError) {
      if (error.originalError instanceof ZodError) {
        return {
          message: "Invalid input",
          extensions: {
            error: error.originalError,
          },
        };
      }
    }

    return formattedError;
  },
  persistedQueries: {
    ttl: 60,
  },
});

// Hand over the WebSocket server to graphql-ws
useServer(
  {
    schema,
    context: async (ctx) => {
      return createContext();
    },
  },
  wsServer
);

async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: "http://localhost:3000",
      credentials: true,
    }),
    cookieParser(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => createContext({ req, res }),
    })
  );

  Sentry.setupExpressErrorHandler(app);

  httpServer.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
    console.log("WebSocket server is running on ws://localhost:4000/graphql");
  });
}

startServer();
