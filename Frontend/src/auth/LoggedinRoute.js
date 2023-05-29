/* eslint-disable react/prop-types */
import LoggedinLayout from "layouts/LoggedinLayout";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "./index";

function LoggedinRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.validated === true ? (
          <LoggedinLayout component={Component} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
export default LoggedinRoute;
