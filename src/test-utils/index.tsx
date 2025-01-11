import { ApolloProvider } from "@apollo/client";
import { render as testRender } from "@testing-library/react";
import { AuthProvider } from "../providers/AuthProvider";
import client from "../client";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  client.cache.reset();

  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
};

export const render = (ui: React.ReactElement) => {
  return testRender(ui, { wrapper: Wrapper });
};
