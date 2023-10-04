/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postService } from "../../services/api/post.service";

const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_data, thunkAPI) => {
        try {
            const response = await postService.getAllPosts(1);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    },
    {
        condition: (_data, { getState }) => {
            const { posts: { status } } = getState();
            if (['fulfilled', 'pending'].includes(status)) {
                return false
            }
            return true;
        },
    })


export { getPosts };