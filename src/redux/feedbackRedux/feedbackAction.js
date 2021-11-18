import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosConfig from 'src/helper/config/axiosConfig';


// // CREATE TASK ACTIONS
export const createFeedbackActions = createAsyncThunk(
    "feedback/createFeedback",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/feedback/create`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);


// // RETRIEVE TASK ACTION
export const retrieveFeedbackActions = createAsyncThunk(
    "feedback/retrieveFeedback",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().get(`/feedback/retrieve`)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);



