import { createSlice } from "@reduxjs/toolkit";
import { createTaskActions, retrieveTaskListActions, retrieveTaskActions, updateTaskActions, deleteTaskActions } from "./task_action"

const initialCompetitionState = {
    isLoading: false,

    createTaskResponse: null,
    createTaskError: null,

    retrieveTaskListResponse: null,
    retrieveTaskListError: null,

    retrieveTaskResponse: null,
    retrieveTaskError: null,

    updateTaskResponse: null,
    updateTaskError: null,

    deleteTaskResponse: null,
    deleteTaskError: null,
};


export const taskSlice = createSlice({
    name: "taskReducer",
    initialState: initialCompetitionState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // CREATE TASK
            .addCase(createTaskActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createTaskActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createTaskResponse = action.payload;
            })
            .addCase(createTaskActions.rejected, (state, action) => {
                state.isLoading = false;
                state.createTaskError = action.meta
            })

            // RETREIVE TASK LIST
            .addCase(retrieveTaskListActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(retrieveTaskListActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.retrieveTaskListResponse = action.payload;
            })
            .addCase(retrieveTaskListActions.rejected, (state, action) => {
                state.isLoading = false;
                // state.retrieveTaskListError = action.meta;
            })


            // RETREIVE TASK
            .addCase(retrieveTaskActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(retrieveTaskActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.retrieveTaskResponse = action.payload;
            })
            .addCase(retrieveTaskActions.rejected, (state, action) => {
                state.isLoading = false;
                // state.retrieveTaskError = action.meta;
            })

            // UPDATE TASK
            .addCase(updateTaskActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateTaskActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateTaskResponse = action.payload;
            })
            .addCase(updateTaskActions.rejected, (state, action) => {
                state.isLoading = false;
                state.updateTaskError = action.meta;
            })


            // DELETE TASK
            .addCase(deleteTaskActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteTaskActions.fulfilled, (state, action) => {
                console.log("action.payload", action.payload)
                state.isLoading = false;
                state.deleteTaskResponse = action.payload;
            })
            .addCase(deleteTaskActions.rejected, (state, action) => {
                state.isLoading = false;
                state.deleteTaskError = action.meta;
            })
    },
});
