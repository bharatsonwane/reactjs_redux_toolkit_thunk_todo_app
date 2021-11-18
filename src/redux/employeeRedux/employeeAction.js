import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosConfig from 'src/helper/config/axiosConfig';
// import store from "src/redux/store"
import store from "src/redux/storeReduxPersist"

import { toolkitTestSecondAction, commonTestThirdAction, commonTestFourthAction } from "../commonRedux/commonAction"

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


// // RETRIEVE Employee List ACTION
export const retrieveEmployeeListActions = createAsyncThunk(
    "employee/retrieveList",
    async (model, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosConfig().get(`/employee/retrieveList`)
            dispatch(toolkitTestSecondAction())
            dispatch(commonTestThirdAction())
            dispatch(commonTestFourthAction())
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
            const response = await axiosConfig().get(`/employee/retrieve/${model}`) // model == userId
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
            store.dispatch(retrieveEmployeeListActions()) // // DISPATCH RETRIEVE Employee ACTIONS
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
            store.dispatch(retrieveEmployeeListActions()) // // DISPATCH RETRIEVE Employee ACTIONS
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);



