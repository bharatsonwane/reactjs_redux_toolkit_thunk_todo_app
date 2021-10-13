import { createSlice } from "@reduxjs/toolkit";
import { isOnlineNetworkActions, sideNavbarMenueShowActions } from "./constant_action"

const initialCompetitionState = {
    isLoading: false,
    payload: null,
    networkStatus: "online",
    isSideNavbarMenuShow: false,
};


export const constantSlice = createSlice({
    name: "constantReducer",
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
        },
});
