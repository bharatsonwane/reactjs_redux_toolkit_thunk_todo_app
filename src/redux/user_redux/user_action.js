import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosConfig from "src/helper/config/axiosConfig";




// // REGISTER USER ACTIONS
export const registerUserActions = createAsyncThunk(
    "user/register",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/authJWT/user/register`, model)
            return response.data;
        } catch (error) {
            return rejectWithValue([], { data: error.response.data });
        }
    }
);


// // SIGNIN USER ACTIONS
export const signInUserActions = createAsyncThunk(
    "user/login",
    async (model, { rejectWithValue }) => {
        try {
            const response = await axiosConfig().post(`/authJWT/login`, model)
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
