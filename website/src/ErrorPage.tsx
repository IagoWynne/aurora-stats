import React from "react";
import { useRouteError } from "react-router-dom";

interface Props {}

const ErrorPage = (): JSX.Element => {
  const error: { statusText?: string; message?: string } = useRouteError() as {
    statusText?: string;
    message?: string;
  };

  return (
    <div id="error-page">
      <h1>Error</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
