import React, { lazy } from 'react';
// import Dashboard from '../pages/Dashboard';
// import Incomes from '../pages/Incomes';
// import Payments from '../pages/Payments';
// import AddingIncome from '../pages/AddingIncome';
// import IncomeDetail from '../pages/IncomeDetail';
// import AddingPayment from '../pages/AddingPayment';
// import PaymentDetail from '../pages/PaymentDetail';
// import PaymentPlans from '../pages/PaymentPlans';
// import HomePage from '../pages/Home';
// import Login from '../pages/Login';
// import SignUp from '../pages/Signup';
// import Accout from '../pages/Accout';
interface RouteConfig {
    path: string;
    component: React.ComponentType;
    layout?: React.ComponentType | null;
}
const routes: RouteConfig[] = [
    {
        path: '/admin/dashboard',
        component: lazy(() => import('../pages/Dashboard')),
        
    },
    {
        path: '/admin/signup',
        component: lazy(() => import('../pages/Signup')),
        
    },
     {
        path: '/admin/login',
        component: lazy(() => import('../pages/Login')),
        
    },
    {
        path: '/admin/incomes',
        component: lazy(() => import('../pages/Incomes')),
        
    },
    {
        path: '/admin/payments',
        component: lazy(() => import('../pages/Payments')),
        
    },
    {
        path: '/admin/incomes/create',
        component: lazy(() => import('../pages/AddingIncome')),
        
    },
    {
        path: '/admin/incomes/:id',
        component: lazy(() => import('../pages/IncomeDetail')),
        
    },
    {
        path: '/admin/payments/create',
        component: lazy(() => import('../pages/AddingPayment')),
        
    },
    {
        path: '/admin/payments/:id',
        component: lazy(() => import('../pages/PaymentDetail')),
        
    },
    {
        path: '/admin/payments-plan',
        component: lazy(() => import('../pages/PaymentPlans')),
        
    },
    {
        path: '/admin/accout',
        component: lazy(() => import('../pages/Accout')),
        
    },
    // { path: '/admin', component: HomePage, layout: null },
    // { path: '/admin/signup', component: SignUp, layout: null },
    // { path: '/admin/login', component: Login, layout: null },
    // { path: '/admin/dashboard', component: Dashboard },
    // { path: '/admin/incomes', component: Incomes },
    // { path: '/admin/payments', component: Payments },
    // { path: '/admin/incomes/create', component: AddingIncome },
    // { path: '/admin/incomes/:id', component: IncomeDetail },
    // { path: '/admin/payments/create', component: AddingPayment },
    // { path: '/admin/payments/:id', component: PaymentDetail },
    // { path: '/admin/payments-plan', component: PaymentPlans },
    // { path: '/admin/accout', component: Accout }



]

export default routes