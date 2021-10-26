import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axiosConfig from 'src/helper/config/axiosConfig';


// // CHECK NETWRK STATUS ACTION
export const isOnlineNetworkActions = createAction(
    'common/onlineNewtwork',
    (model) => {
        return { payload: model }
    }
)

// // HIDE / SHOW SIDEBAR MENUE ACTION
export const sideNavbarMenueShowActions = createAction(
    'common/sideNavbarMenueShow',
    (model) => {
        if (model === false) {
            return { payload: true }
        }
        else {
            return { payload: false }
        }
    }
)

// // For Testing Purpose ----------------------------------------------
export const toolkitTestFirstAction = createAction(
    'common/toolkitTestFirstAction',
    (model) => {
        return { payload: model }
    }
)

export const toolkitTestSecondAction = createAction(
    'common/toolkitTestSecondAction',
    (model) => {
        return { payload: model }
    }
)


export const COMMON_TEST_FIRST = "COMMON_TEST_FIRST";
export const COMMON_TEST_SECOND = "COMMON_TEST_SECOND";
export const COMMON_TEST_THIRD = "COMMON_TEST_THIRD";
export const COMMON_TEST_FOURTH = "COMMON_TEST_FOURTH";

export const commonTestFirstAction = (model) => {
    return {
        type: COMMON_TEST_FIRST,
        model
    }
}

export const commonTestSecondAction = (model) => {
    return {
        type: COMMON_TEST_SECOND,
        model
    }
}

export const commonTestThirdAction = (model) => {
    return {
        type: COMMON_TEST_THIRD,
        model
    }
}

export const commonTestFourthAction = (model) => {
    return {
        type: COMMON_TEST_FOURTH,
        model
    }
}