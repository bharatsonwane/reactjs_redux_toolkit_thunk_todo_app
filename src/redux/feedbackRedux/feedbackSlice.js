import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from 'redux-persist/lib/constants';
import { createFeedbackActions, retrieveFeedbackActions } from "./feedbackAction"

const initialCompetitionState = {
    isLoading: false,

    createFeedbackResponse: null,
    createFeedbackError: null,

    retrieveFeedbackResponse: null,
    retrieveFeedbackError: null,
};


export const feedbackSlice = createSlice({
    name: "feedbackReducer",
    initialState: initialCompetitionState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // CREATE TASK
            .addCase(createFeedbackActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createFeedbackActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createFeedbackResponse = action.payload;
            })
            .addCase(createFeedbackActions.rejected, (state, action) => {
                state.isLoading = false;
                state.createFeedbackError = action.meta
            })

            // RETREIVE TASK
            .addCase(retrieveFeedbackActions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(retrieveFeedbackActions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.retrieveFeedbackResponse = action.payload;
            })
            .addCase(retrieveFeedbackActions.rejected, (state, action) => {
                console.log("bharatAction", action)
                state.isLoading = false;
                // state.retrieveFeedbackError = action.meta;
            })

            // rehydrate
            .addCase(REHYDRATE, (state, action) => {
                // console.log("rehydrateAction", action)
            })
    },
});
