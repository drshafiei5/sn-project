/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postService } from "../../services/api/post.service";

const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (thunkAPI) => {
        try {
            const response = await postService.getAllPosts(1);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    })


export { getPosts };