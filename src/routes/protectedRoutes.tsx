import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
// import Loader from 'sharedComponent/Loader';
const Loader = lazy(() => import('../pages/Loader'))

const ProtectedRoutes: React.FC = () => (
  <Routes>
    <Suspense fallback = {<Loader />}>
      {routes.map(({ component: Component, path }) => (
        <Route path={`/${path}`} key={path} element ={<Component />}>
        </Route>
      ))}
    </Suspense>
  </Routes>
);

export default ProtectedRoutes;
