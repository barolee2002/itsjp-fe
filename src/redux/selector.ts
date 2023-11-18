import { RootState } from './store';

export const userLogin = (state: RootState) => {return state.authen.userLogin};
export const userInfor = (state : RootState) => {return state.userInfor.userInfor};
export const spendings = (state : RootState) => {return state.spendings.spending}
export const income = (state : RootState) => {return state.incomes.income}
export const plan = (state: RootState) => {return state.plan.plan}