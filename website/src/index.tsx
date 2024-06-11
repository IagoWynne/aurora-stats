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
import "./index.css";
import { Wheel } from "./Wheel";
import WheelStats from "./Wheel/components/WheelStats/WheelStats";
import VibeCheck from "./VibeCheck";
import VibeCheckStats from "./VibeCheck/components/VibeCheckStats";
import { LINKS } from "./Common";
import { Admin } from "./Admin";

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
        path: "/",
        element: <div>Hello World</div>
      },
      {
        path: LINKS.admin,
        element: <Admin />,
      },
      {
        path: LINKS.standUpWheel,
        element: <Wheel />,
      },
      {
        path: LINKS.wheelStats,
        element: <WheelStats />,
      },
      {
        path: LINKS.vibeCheck,
        element: <VibeCheck />,
      },
      {
        path: LINKS.vibeCheckStats,
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
