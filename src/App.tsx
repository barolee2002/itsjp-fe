import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import BaseLayout from './components/BaseLayout';
import './App.scss'
import { useDispatch } from 'react-redux';
import { login } from './components/BaseHomePage/authenSlice';
interface Props {
  children?: React.ReactNode;
}


export default function App() {
    const dispatch = useDispatch()
    const userLogin = localStorage.getItem('userLogin');
    let isAuthenticated = false
    if (userLogin !== null) isAuthenticated = true
    if (userLogin !== null) {
        try {
            const parsedUser = JSON.parse(userLogin);
    
            if (parsedUser.isLogin === true) {
                dispatch(login(parsedUser));
            } else {
                console.log('User is not logged in.');
            }
        } catch (error) {
            console.error('Error parsing userLogin JSON:', error);
        }
    } else {
        console.log('userLogin is null');
    }

    
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
