import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.reducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
});