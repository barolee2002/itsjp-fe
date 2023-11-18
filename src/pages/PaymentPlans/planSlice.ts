import { createSlice } from '@reduxjs/toolkit';
import { paymentsPlan } from '../../utils/interface/interface';
export const PlanSlice = createSlice({
    name: 'plan',
    initialState: {
        plan : [] as paymentsPlan[]
    },
    reducers: {
        updatePlan : (state,action) => {
            state.plan = action.payload
        },
        deleteItemPlan : (state, action) => {
            state.plan=state.plan.filter((item) => item.plannerId != action.payload)
        }

    },
});

export const { updatePlan,deleteItemPlan} = PlanSlice.actions;

export default PlanSlice.reducer;