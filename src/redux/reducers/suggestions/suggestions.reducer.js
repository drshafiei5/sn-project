import { createSlice } from '@reduxjs/toolkit';
import { getUserSuggestions } from '../../api/suggestion';

const initialState = {
    users: [],
    status: 'idle'
};

const suggestionsSlice = createSlice({
    name: 'suggestions',
    initialState,
    reducers: {
        setSuggestions: (state, action) => {
            const { users } = action.payload;
            state.users = [...users];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserSuggestions.pending, (state) => {
            state.status = 'pending';
        });
        
        builder.addCase(getUserSuggestions.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            const { users } = action.payload;
            state.users = [...users];
        });

        builder.addCase(getUserSuggestions.rejected, (state) => {
            state.status = 'rejected';
        });
    }
});

export const { setSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;