import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";

Amplify.configure(awsExports);

const client = new ApolloClient({
  uri: "https://k2ewq7jk6zf5ng7fdrf2zawgvm.appsync-api.us-east-1.amazonaws.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    "X-Api-Key": "da2-2zsrqvsflradtoonzwiywanrpm",
  },
  connectToDevTools: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
