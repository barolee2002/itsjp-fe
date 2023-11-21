import React, { ReactNode } from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: ReactNode;
}

function PrivateRoute({ children, isAuthenticated, ...rest }: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
