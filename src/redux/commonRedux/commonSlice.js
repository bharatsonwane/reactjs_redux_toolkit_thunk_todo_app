import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { REHYDRATE } from 'redux-persist/lib/constants';
import {
    isOnlineNetworkActions, sideNavbarMenueShowActions,
    toolkitTestFirstAction, toolkitTestSecondAction,
    COMMON_TEST_FIRST, COMMON_TEST_SECOND, COMMON_TEST_THIRD, COMMON_TEST_FOURTH,
} from "./commonAction";
import { retrieveTaskListActions, } from "../taskRedux/taskAction";
import { retrieveEmployeeListActions } from "../employeeRedux/employeeAction";

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

                .addCase(COMMON_TEST_FIRST, (state, action) => {
                    console.log("addCase with directly action type.")
                })



                // rehydrate
                .addCase(REHYDRATE, (state, action) => {
                    // console.log("rehydrateAction", action)
                })

                // // *** .addMatcher with isAnyOf for multiple actions ***
                .addMatcher(isAnyOf(toolkitTestFirstAction, toolkitTestSecondAction, retrieveEmployeeListActions.fulfilled, retrieveTaskListActions.fulfilled), (state, action) => {
                    console.log(".addMatcher with isAnyOf for multiple actions", action)
                })

                // // *** .addMatcher with isAnyOf for multiple actions ***
                .addMatcher(isAnyOf("true"), (state, action) => {
                    let actionTypeArray = [COMMON_TEST_FIRST, COMMON_TEST_SECOND, COMMON_TEST_THIRD, COMMON_TEST_FOURTH]
                    let testActionTypeInclude = actionTypeArray.includes(action.type)
                    if (testActionTypeInclude) {
                        console.log(".addMatcher with isAnyOf('true') for multiple actions With Types", action)
                    }
                })
        },
});
