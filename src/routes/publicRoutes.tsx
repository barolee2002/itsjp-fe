import React from 'react';
import { Navigate, Route } from 'react-router-dom';

interface PublicRouteProps {
  isAuthenticated: boolean;
  children?: React.ReactNode;
}

function PublicRoute({ children, isAuthenticated }: PublicRouteProps) {
  return (
    !isAuthenticated ? (
      <React.Fragment>{children}</React.Fragment>
    ) : (
      <Navigate to="/admin/dashboard" replace />
    )

  );
}

export default PublicRoute;
