import { configureStore } from '@reduxjs/toolkit';
import authenReducer from '../components/BaseHomePage/authenSlice';
import accountReducer from '../pages/Accout/accountSlice';
import paymentReducer from '../pages/Payments/paymentSlice';
import incomeReducer from '../pages/Incomes/incomeSlice';
import planReducer from '../pages/PaymentPlans/planSlice';
 

const store = configureStore({
    reducer: {
        authen : authenReducer,
        userInfor : accountReducer,
        spendings : paymentReducer,
        incomes : incomeReducer,
        plan : planReducer
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;