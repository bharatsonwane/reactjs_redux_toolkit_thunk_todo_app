import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosConfig from 'src/helper/config/axiosConfig';
import { store } from "src/redux/store"


// // CREATE TASK ACTIONS
export const createTaskActions = createAsyncThunk(
    "task/createTask",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/todo/create`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);


// // RETRIEVE TASK LIST ACTION
export const retrieveTaskListActions = createAsyncThunk(
    "task/retrieveList",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().get(`/todo/retrieveList`)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);

// // RETRIEVE TASK ACTION
export const retrieveTaskActions = createAsyncThunk(
    "task/retrieveTask",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().get(`/todo/retrieve/${model}`) // model == taskId
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);

// UPDATE TASK ACTION
export const updateTaskActions = createAsyncThunk(
    "task/updateTask",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().put(`/todo/update`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);


// // DELETE TASK ACTION
export const deleteTaskActions = createAsyncThunk(
    "task/deleteTask",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().delete(`/todo/${model}`)
            store.dispatch(retrieveTaskListActions()) // // DISPATCH RETRIEVE TASK ACTIONS
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);



