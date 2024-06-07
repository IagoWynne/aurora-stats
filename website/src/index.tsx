import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import config from "./config.json";
import App from "./App";
import ErrorPage from "./ErrorPage";
import { People } from "./People";
import "./index.css";
import { Wheel, WheelOptions } from "./Wheel";
import WheelStats from "./Wheel/components/WheelStats/WheelStats";
import VibeCheck from "./VibeCheck";
import VibeCheckStats from "./VibeCheck/components/VibeCheckStats";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const api = config.api.host;
const apiPort = config.api.port;
const prefix = api?.startsWith("http") ? "" : "http://";
const apiUri = `${prefix}${api}${apiPort ? `:${apiPort}`:""}/query`
const httpLink = createHttpLink({ uri: apiUri });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: `${config.baseUrl}/`,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `${config.baseUrl}/people`,
        element: <People />,
      },
      {
        path: `${config.baseUrl}/wheel`,
        element: <Wheel />,
      },
      {
        path: `${config.baseUrl}/wheel/options`,
        element: <WheelOptions />,
      },
      {
        path: `${config.baseUrl}/wheel/stats`,
        element: <WheelStats />,
      },
      {
        path: `${config.baseUrl}/vibecheck`,
        element: <VibeCheck />,
      },
      {
        path: `${config.baseUrl}/vibecheck/stats`,
        element: <VibeCheckStats />
      }
    ],
  },
]);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
