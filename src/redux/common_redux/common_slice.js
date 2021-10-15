import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { isOnlineNetworkActions, sideNavbarMenueShowActions } from "./common_action"
import { retrieveTaskListActions, } from "../task_redux/task_action"
import { retrieveEmployeeListActions } from "../employee_redux/employee_action"


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
        },
});
