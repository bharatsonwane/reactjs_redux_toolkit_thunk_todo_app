import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { registerUserActions, signInUserActions, retrieveUserProfileActions, } from "./userAction"


const initialCompetitionState = {
  isLoading: false,
  payload: null,

  signInUserResponce: null,
  signInUserError: null,

  registerUserResponce: null,
  registerUserError: null,

  retrieveUserProfileResponce: null,
  retrieveUserProfileError: null,

};


export const userSlice = createSlice({
  name: "userReducer",
  initialState: initialCompetitionState,
  reducers: {},
  extraReducers: (builder) => {
    builder

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
        state.registerUserError = action.meta;
      })

      // // SIGNIN USER REDUCER
      .addCase(signInUserActions.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(signInUserActions.fulfilled, (state, action) => {
        let tokenExpires = new Date(new Date().getTime() + 5 * 60 * 60 * 1000);
        Cookies.set('reduxToolkitToken', action.payload.token, { expires: tokenExpires })
        localStorage.setItem("userRole", action.payload.userRole)
        localStorage.setItem("divisionName", action.payload.divisionName)
        state.isLoading = false;
        state.signInUserResponce = action.payload;
      })
      .addCase(signInUserActions.rejected, (state, action) => {
        state.isLoading = false;
        state.signInUserError = action.meta;
      })

      // // RETRIEVE USER PROFILE
      .addCase(retrieveUserProfileActions.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(retrieveUserProfileActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.retrieveUserProfileResponce = action.payload;
      })
      .addCase(retrieveUserProfileActions.rejected, (state, action) => {
        state.isLoading = false;
        state.retrieveUserProfileError = action.meta;
      })


      // rehydrate
      .addCase(REHYDRATE, (state, action) => {
        // console.log("rehydrateAction", action)
      })
  },
});
