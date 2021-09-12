import axiosConfig from 'src/helper/config/axiosConfig';
import { globalStateSlice } from "./globalState_slice";
const { actions } = globalStateSlice;




export const sideNavbarMenueShowActions = (model) => async (dispatch) => {
    try {
        // dispatch starting action
        if (model === false) {
            dispatch(actions.sideNavbarMenueLayoutShow())
        }
        else {
            dispatch(actions.sideNavbarMenueShow())
        }

        // dispatch success action
    } catch (error) {
        // dispatch failure action

    }
}


export const isOnlineNetworkActions = (model) => async (dispatch) => {
    try {
        dispatch(actions.isOnlineNetwork(model))
        // dispatch success action
    } catch (error) {
        // dispatch failure action
    }
}
