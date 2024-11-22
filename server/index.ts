import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { useCookies as cookiePlugin } from "@whatwg-node/server-plugin-cookies";
import schema from "./schema";
import createContext from "./context";

const yoga = createYoga({
  schema,
  context: (initialContext) => {
    return createContext(initialContext);
  },
  plugins: [cookiePlugin()],
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000/graphql");
});
