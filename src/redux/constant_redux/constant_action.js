import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axiosConfig from 'src/helper/config/axiosConfig';


// // CHECK NETWRK STATUS ACTION
export const isOnlineNetworkActions = createAction(
    'constant/onlineNewtwork',
    (model) => {
        return { payload: model }
    }
)

// // HIDE / SHOW SIDEBAR MENUE ACTION
export const sideNavbarMenueShowActions = createAction(
    'constant/sideNavbarMenueShow',
    (model) => {
        if (model === false) {
            return { payload: true }
        }
        else {
            return { payload: false }
        }
    }
)
