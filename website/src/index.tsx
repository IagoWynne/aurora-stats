import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import App from "./App";
import ErrorPage from "./ErrorPage";
import { People } from "./People";
import "./index.css";
import { Wheel, WheelOptions } from "./Wheel";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const httpLink = createHttpLink({ uri: "http://localhost:8080/query" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/people",
        element: <People />,
      },
      {
        path: "/wheel",
        element: <Wheel />,
        children: [
          {
            path: "/wheel/options",
            element: <WheelOptions />
          }
        ]
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
