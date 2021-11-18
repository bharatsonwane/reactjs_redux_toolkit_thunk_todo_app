import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import { commonSlice } from "./commonRedux/commonSlice";
import { userSlice } from "./userRedux/userSlice";
import { employeeSlice } from "./employeeRedux/employeeSlice";
import { taskSlice } from "./taskRedux/taskSlice";
import { feedbackSlice } from "./feedbackRedux/feedbackSlice";

//Combined all reducer to root reducer
const rootReducer = (history) => combineReducers({
    router: connectRouter(history), // // get history access in reducer
    commonReducer: commonSlice.reducer,
    userReducer: userSlice.reducer,
    employeeReducer: employeeSlice.reducer,
    taskReducer: taskSlice.reducer,
    feedbackReducer: feedbackSlice.reducer,
});

export default rootReducer