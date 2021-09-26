import { createSlice } from "@reduxjs/toolkit";
import { createEmployeeActions, retrieveEmployeeActions, updateEmployeeActions, updateEmployeeActivationStatusActions, deleteEmployeeActions } from "./employee_action"

const initialCompetitionState = {
    isLoading: false,

    createEmployeeResponse: null,
    createEmployeeError: null,

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

            // RETREIVE EMPLOYEE
            .addCase(retrieveEmployeeActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(retrieveEmployeeActions.fulfilled, (state, action) => {
                console.log("bharatAction", action)
                state.isLoading = false;
                state.retrieveEmployeeResponse = action.payload;
            })
            .addCase(retrieveEmployeeActions.rejected, (state, action) => {
                console.log("bharatAction", action)
                state.isLoading = false;
                // state.retrieveEmployeeError = action.meta;
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
    },
});
