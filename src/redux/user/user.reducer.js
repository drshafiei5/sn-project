import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    profile: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { token, profile } = action.payload;
            state.token = token;
            state.profile = profile;
        },
        clearUser: (state) => {
            state.token = '';
            state.profile = null;
        },
        updateUserProfile: (state, action) => {
            state.profile = action.payload;
        }
    }
})

export const { setUser, clearUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;