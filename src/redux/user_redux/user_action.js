import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosConfig from "src/helper/config/axiosConfig";




// // SIGNIN USER ACTIONS
export const signInOwnerActions = createAsyncThunk(
    "user/authJwt/owner/login",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/user/authJwt/owner/login`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);



// // REGISTER USER ACTIONS
export const registerUserActions = createAsyncThunk(
    "/user/manager/register",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/user/manager/register`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);


// // SIGNIN USER ACTIONS
export const signInUserActions = createAsyncThunk(
    "user/authJwt/employee/login",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/user/authJwt/employee/login`, model)
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


export const retrieveUserProfileActions = createAsyncThunk(
    "user/retrieveProfile",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().get(`/user/retrieveProfile`)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data })
        }
    }
)
