/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services/api/user.service";

const getUserSuggestions = createAsyncThunk(
    'user/getSuggestions',
    async (thunkAPI) => {
        try {
            const response = await userService.getUserSuggestions();
            return response.data;
        } catch (error) {
            console.log(error);
        }
    })


export { getUserSuggestions };