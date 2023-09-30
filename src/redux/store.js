import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/user.reducer';
import postsReducer from './reducers/post/posts.reducer';
import suggestionsReducer from './reducers/suggestions/suggestions.reducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer,
        suggestions: suggestionsReducer,
    }
});