import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { signInOwnerActions, registerUserActions, signInUserActions, retrieveUserDataActions } from "./user_action"


const initialCompetitionState = {
  isLoading: false,
  payload: null,

  signInOwnerResponce: null,
  signInOwnerError: null,

  registerUserResponce: null,
  registerUserError: null,

  signInUserResponce: null,
  signInUserError: null,
};


export const userSlice = createSlice({
  name: "userReducer",
  initialState: initialCompetitionState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // // SIGNIN OWNER REDUCER
      .addCase(signInOwnerActions.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(signInOwnerActions.fulfilled, (state, action) => {
        let tokenExpires = new Date(new Date().getTime() + 5 * 60 * 60 * 1000);
        Cookies.set('reduxToolkitToken', action.payload.token, { expires: tokenExpires })
        localStorage.setItem("userRole", action.payload.role)
        state.isLoading = false;
        state.signInOwnerResponce = action.payload;
      })
      .addCase(signInOwnerActions.rejected, (state, action) => {
        state.isLoading = false;
        state.signInOwnerError = action.dmeta.data;
      })


      // // CREATE USER REDUCER
      .addCase(registerUserActions.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(registerUserActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registerUserResponce = action.payload;
      })
      .addCase(registerUserActions.rejected, (state, action) => {
        state.isLoading = false;
        state.registerUserError = action.meta.data;
      })

      // // SIGNIN USER REDUCER
      .addCase(signInUserActions.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(signInUserActions.fulfilled, (state, action) => {
        let tokenExpires = new Date(new Date().getTime() + 5 * 60 * 60 * 1000);
        Cookies.set('reduxToolkitToken', action.payload.token, { expires: tokenExpires })
        state.isLoading = false;
        state.signInUserResponce = action.payload;
      })
      .addCase(signInUserActions.rejected, (state, action) => {
        state.isLoading = false;
        state.signInUserError = action.meta.data;
      })
  },
});
