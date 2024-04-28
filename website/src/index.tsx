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
import WheelStats from "./Wheel/components/WheelStats/WheelStats";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const host = "172.20.0.3";
const httpLink = createHttpLink({ uri: `http://${host}:8080/query` });

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
      },
      {
        path: "/wheel/options",
        element: <WheelOptions />,
      },
      {
        path: "/wheel/stats",
        element: <WheelStats />,
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
