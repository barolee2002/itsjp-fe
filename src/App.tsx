import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import BaseLayout from './components/BaseLayout';
interface Props {
  children?: React.ReactNode;
}
// import './App.css'
export default function App() {
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
