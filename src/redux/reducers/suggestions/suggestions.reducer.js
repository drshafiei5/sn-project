import { createSlice } from '@reduxjs/toolkit';
import { getUserSuggestions } from '../../api/suggestion';

const initialState = {
    users: [],
    isLoading: false
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
            state.isLoading = true;
        });
        
        builder.addCase(getUserSuggestions.fulfilled, (state, action) => {
            state.isLoading = false;
            const { users } = action.payload;
            state.users = [...users];
        });

        builder.addCase(getUserSuggestions.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const { setSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;