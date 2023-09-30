/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import { getPosts } from "../../api/posts";

const initialState = {
    posts: [],
    totalPostsCount: 0,
    isLoading: false
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state, { payload }) => {
            state.isLoading = true;
        });

        builder.addCase(getPosts.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            const { posts, totalPosts } = payload;
            state.posts = [...posts];
            state.totalPostsCount = totalPosts;
        });

        builder.addCase(getPosts.rejected, (state, { payload }) => {
            state.isLoading = false;
        });
    },
})

const postsReducer = postsSlice.reducer
export const { addToPosts } = postsSlice.actions;
export default postsReducer;