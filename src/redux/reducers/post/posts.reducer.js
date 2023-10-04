/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import { getPosts } from "../../api/posts";

const initialState = {
    posts: [],
    totalPostsCount: 0,
    status: 'idle'
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state, { payload }) => {
            state.status = 'pending';
        });

        builder.addCase(getPosts.fulfilled, (state, { payload }) => {
            state.status = 'fulfilled';
            const { posts, totalPosts } = payload;
            state.posts = [...posts];
            state.totalPostsCount = totalPosts;
        });

        builder.addCase(getPosts.rejected, (state, { payload }) => {
            state.status = 'rejected';
        });
    },
})

const postsReducer = postsSlice.reducer
export const { addToPosts } = postsSlice.actions;
export default postsReducer;