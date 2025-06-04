import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/error-boundary.tsx";
import client from "./graphql/client.ts";
import router from "./routes/index.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </StrictMode>
  </ApolloProvider>,
);
