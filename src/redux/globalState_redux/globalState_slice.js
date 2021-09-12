import { createSlice } from "@reduxjs/toolkit";

const initialCompetitionState = {
    isLoading: false,
    payload: null,
    isSideNavbarMenuShow: false,
    networkStatus: "online"
};


export const globalStateSlice = createSlice({
    name: "globalStateReducer",
    initialState: initialCompetitionState,
    reducers: {
        // // SIDE NAVBAR MENUE SHOW / HIDE
        sideNavbarMenueShow: (state, action) => {
            state.isSideNavbarMenuShow = !state.isSideNavbarMenuShow;
        },
        sideNavbarMenueLayoutShow: (state, action) => {
            state.isSideNavbarMenuShow = false;
        },

        // // IS ONLINE NETWORK
        isOnlineNetwork: (state, action) => {
            state.networkStatus = action.payload;
        },

    },
    extraReducers: {

    },
});
