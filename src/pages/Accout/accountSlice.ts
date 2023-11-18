import { createSlice } from '@reduxjs/toolkit';
import { userInfor } from '../../utils/interface/interface';
export const accountSlice = createSlice({
    name: 'userInformation',
    initialState: {
        userInfor : <userInfor>{}
    },
    reducers: {
        updateInfor : (state,action) => {
                state.userInfor = action.payload
        }

    },
});

export const { updateInfor} = accountSlice.actions;

export default accountSlice.reducer;