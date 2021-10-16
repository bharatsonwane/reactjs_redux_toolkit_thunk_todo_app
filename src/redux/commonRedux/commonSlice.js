import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { isOnlineNetworkActions, sideNavbarMenueShowActions } from "./commonAction"
import { retrieveTaskListActions, } from "../taskRedux/taskAction"
import { retrieveEmployeeListActions } from "../employeeRedux/employeeAction"


const initialCompetitionState = {
    isLoading: false,
    payload: null,
    networkStatus: "online",
    isSideNavbarMenuShow: false,
};


export const commonSlice = createSlice({
    name: "commonReducer",
    initialState: initialCompetitionState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                // // NETWORK STATUS
                .addCase(isOnlineNetworkActions, (state, action) => {
                    state.networkStatus = action.payload;
                })

                // // SHOW / HIDE SIDEBAR
                .addCase(sideNavbarMenueShowActions, (state, action) => {
                    state.isSideNavbarMenuShow = action.payload;
                })


                // // *** .addMatcher with isAnyOf for multiple actions ***
                .addMatcher(isAnyOf(retrieveEmployeeListActions.fulfilled, retrieveTaskListActions.fulfilled), (state, action) => {
                    console.log(".addMatcher with isAnyOf for multiple actions", action)
                })

                // // *** .addMatcher with isAnyOf for multiple actions ***
                .addMatcher(isAnyOf("true"), (state, action) => {
                    let actionTypeArray = ["MODAL_CONFIRM", "MODAL_PASSWORDLOST", "MODAL_NEW_PIT", "MODAL_NEW_PATTERN", "MODAL_SURVEY_IMPORT"]
                    let testActionTypeInclude = actionTypeArray.includes(action.type)
                    if (testActionTypeInclude) {
                        state.modal = action.modal;
                    }
                })
        },
});
