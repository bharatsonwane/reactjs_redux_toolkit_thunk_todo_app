import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosConfig from 'src/helper/config/axiosConfig';
import { store } from "src/redux/store"


// // CREATE Employee ACTIONS
export const createEmployeeActions = createAsyncThunk(
    "employee/createEmployee",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/employee/create`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);


// // RETRIEVE Employee ACTION
export const retrieveEmployeeActions = createAsyncThunk(
    "employee/retrieve",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().get(`/employee/retrieve`)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);

// UPDATE Employee ACTION
export const updateEmployeeActions = createAsyncThunk(
    "employee/updateEmployee",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().put(`/employee/update`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);


// // DELETE Employee ACTION
export const updateEmployeeActivationStatusActions = createAsyncThunk(
    "employee/updateEmployeeActivationStatus",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().put(`/employee/update/userActivationStatus`, model)
            store.dispatch(retrieveEmployeeActions()) // // DISPATCH RETRIEVE Employee ACTIONS
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);



// // DELETE Employee ACTION
export const deleteEmployeeActions = createAsyncThunk(
    "employee/deleteEmployee",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().delete(`/employee/${model}`)
            store.dispatch(retrieveEmployeeActions()) // // DISPATCH RETRIEVE Employee ACTIONS
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);



