import React, { ReactNode } from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: ReactNode;
}

function PrivateRoute({ children, isAuthenticated, ...rest }: PrivateRouteProps) {
  return isAuthenticated ? {children} : <Navigate to = 'login'/>
}

export default PrivateRoute;
