import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from '../../utils/interface/interface';
export const authenSlice = createSlice({
    name: 'authentication',
    initialState: {
        userLogin : <userLogin>{}
    },
    reducers: {
        login: (state, action) => {
            state.userLogin = action.payload
        },
        logout: (state) => {
            localStorage.removeItem('userLogin');
        },
    },
});

export const { login, logout } = authenSlice.actions;

export default authenSlice.reducer;