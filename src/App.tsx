import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import BaseLayout from './components/BaseLayout';
import './App.css'
import { lazy, Suspense } from 'react';
interface Props {
  children?: React.ReactNode;
}


// import Loader from 'shareComponent/Loader';
// import ProtectedRoutes from './routes/protectedRoutes'; //Authenticated routes
// import PublicRoute from './routes/publicRoutes';
// import PrivateRoute from './routes/privateRoutes';
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/Signup'))
const HomePage = lazy(() => import('./pages/Home'))
export default function App() {
    const userLogin = localStorage.getItem('userLogin');
    let isAuthenticated = false
    if (userLogin !== null) isAuthenticated = true
    return (
        <Router>
            <div className="App" style ={{height : '100%'}}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout: React.ComponentType<Props>| typeof Fragment = BaseLayout;
                        if (route.layout === null) {
                          Layout = Fragment;
                        } else if (route.layout) {
                          Layout = route.layout;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
          </Router>  
    );
}
