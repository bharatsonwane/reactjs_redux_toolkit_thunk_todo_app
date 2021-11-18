import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from 'redux-persist/lib/constants';
import { createEmployeeActions, retrieveEmployeeListActions, retrieveEmployeeActions, updateEmployeeActions, updateEmployeeActivationStatusActions, deleteEmployeeActions } from "./employeeAction"

const initialCompetitionState = {
    isLoading: false,

    createEmployeeResponse: null,
    createEmployeeError: null,

    retrieveEmployeeListResponse: null,
    retrieveEmployeeListError: null,

    retrieveEmployeeResponse: null,
    retrieveEmployeeError: null,

    updateEmployeeResponse: null,
    updateEmployeeError: null,

    updateEmployeeActivationResponse: null,
    updateEmployeeActivationError: null,

    deleteEmployeeResponse: null,
    deleteEmployeeError: null,
};


export const employeeSlice = createSlice({
    name: "employeeReducer",
    initialState: initialCompetitionState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // CREATE EMPLOYEE
            .addCase(createEmployeeActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createEmployeeActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createEmployeeResponse = action.payload;
            })
            .addCase(createEmployeeActions.rejected, (state, action) => {
                state.isLoading = false;
                state.createEmployeeError = action.meta
            })

            // RETREIVE EMPLOYEE LIST
            .addCase(retrieveEmployeeListActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(retrieveEmployeeListActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.retrieveEmployeeListResponse = action.payload;
            })
            .addCase(retrieveEmployeeListActions.rejected, (state, action) => {
                console.log("bharatAction", action)
                state.isLoading = false;
                // state.retrieveEmployeeListError = action.meta;
            })

            // RETREIVE EMPLOYEE 
            .addCase(retrieveEmployeeActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(retrieveEmployeeActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.retrieveEmployeeResponse = action.payload;
            })
            .addCase(retrieveEmployeeActions.rejected, (state, action) => {
                console.log("bharatAction", action)
                state.isLoading = false;
                state.retrieveEmployeeError = action.meta;
            })

            // UPDATE EMPLOYEE
            .addCase(updateEmployeeActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateEmployeeActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateEmployeeResponse = action.payload;
            })
            .addCase(updateEmployeeActions.rejected, (state, action) => {
                state.isLoading = false;
                state.updateEmployeeError = action.meta;
            })

            // UPDATE EMPLOYEE ACTIVATION STATUS
            .addCase(updateEmployeeActivationStatusActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateEmployeeActivationStatusActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateEmployeeActivationResponse = action.payload;
            })
            .addCase(updateEmployeeActivationStatusActions.rejected, (state, action) => {
                state.isLoading = false;
                state.updateEmployeeActivationError = action.meta;
            })

            // DELETE EMPLOYEE
            .addCase(deleteEmployeeActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteEmployeeActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteEmployeeResponse = action.payload;
            })
            .addCase(deleteEmployeeActions.rejected, (state, action) => {
                state.isLoading = false;
                state.deleteEmployeeError = action.meta;
            })

            // rehydrate
            .addCase(REHYDRATE, (state, action) => {
                if (action.payload && action.payload.employeeReducer) {
                    state.retrieveEmployeeListResponse = action.payload.employeeReducer.retrieveEmployeeListResponse
                }
            })
    },
});
