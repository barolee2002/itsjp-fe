import React from 'react';
import Dashboard from '../pages/Dashboard';
import Incomes from '../pages/Incomes';
import Payments from '../pages/Payments';
import AddingIncome from '../pages/AddingIncome';
import IncomeDetail from '../pages/IncomeDetail';
import AddingPayment from '../pages/AddingPayment';
import PaymentDetail from '../pages/PaymentDetail';
import PaymentPlans from '../pages/PaymentPlans';
import HomePage from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import Accout from '../pages/Accout';
interface RouteConfig {
    path: string;
    component: React.ComponentType;
    layout?: React.ComponentType | null;
}
const publicRoutes : RouteConfig[] =[
    {path :'/admin', component : HomePage,layout : null},
    {path :'/admin/signup', component : SignUp,layout : null},
    {path :'/admin/login', component : Login,layout : null},
    {path : '/admin/dashboard' , component : Dashboard},
    {path : '/admin/incomes', component : Incomes},
    {path : '/admin/payments', component : Payments},
    {path : '/admin/incomes/create', component : AddingIncome},
    {path : '/admin/incomes/:id',component : IncomeDetail},
    {path : '/admin/payments/create', component :AddingPayment},
    {path : '/admin/payments/:id',component : PaymentDetail},
    {path : '/admin/payments-plan',component : PaymentPlans},
    {path : '/admin/accout', component :Accout}
    


]

export {publicRoutes}