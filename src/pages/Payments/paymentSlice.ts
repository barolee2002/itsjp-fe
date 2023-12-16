import { createSlice } from '@reduxjs/toolkit';
import { pays } from '../../utils/interface/interface';
export const paymentsSlice = createSlice({
    name: 'payments',
    initialState: {
        spending : [] as pays[]
    },
    reducers: {
        updateSpending : (state,action) => {
            state.spending = action.payload
        },
        deleteSpending : (state, action) => {
            state.spending=state.spending.filter((item) => item.spendingId !== action.payload)
        }

    },
});

export const { updateSpending,deleteSpending} = paymentsSlice.actions;

export default paymentsSlice.reducer;