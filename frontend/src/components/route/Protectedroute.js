import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Navigate } from "react-router";

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Navigate to="/auth" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Navigate to="/auth" />;
            }

            return <Element {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
