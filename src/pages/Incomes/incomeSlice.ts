import { createSlice } from '@reduxjs/toolkit';
import { incomes, pays } from '../../utils/interface/interface';
export const IncomeSlice = createSlice({
    name: 'incomes',
    initialState: {
        income : [] as incomes[]
    },
    reducers: {
        updateIncomes : (state,action) => {
            state.income = action.payload
        },
        deleteInome : (state, action) => {
            state.income=state.income.filter((item) => item.incomeId != action.payload)
        }

    },
});

export const { updateIncomes,deleteInome} = IncomeSlice.actions;

export default IncomeSlice.reducer;