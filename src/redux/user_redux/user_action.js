import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosConfig from "src/helper/config/axiosConfig";




// // SIGNIN USER ACTIONS
export const signInOwnerActions = createAsyncThunk(
    "owner/login",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/authJwt/user/owner/login`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);



// // REGISTER USER ACTIONS
export const registerUserActions = createAsyncThunk(
    "user/register",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/authJWT/user/manager/register`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);


// // SIGNIN USER ACTIONS
export const signInUserActions = createAsyncThunk(
    "/authJWT/user/employee/login",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/authJWT/user/employee/login`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);


// // USER TOKEN EXPIRY ACTIONS
export const userTokenExpiryActions = (model) => async (dispatch) => {

    if (typeof window !== "undefined") {
        console.log("tokenExpiryonClientSideResponse")
    }
}


// // RETRIEVE USER ACTIONS
export const retrieveUserDataActions = createAsyncThunk(
    "user/signin",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/authJWT`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);
