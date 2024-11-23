import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import router from "./router";
import client from "./client";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
