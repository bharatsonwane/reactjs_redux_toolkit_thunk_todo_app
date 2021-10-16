import { combineReducers } from "redux";
import { commonSlice } from "./commonRedux/commonSlice";
import { userSlice } from "./userRedux/userSlice";
import { employeeSlice } from "./employeeRedux/employeeSlice";
import { taskSlice } from "./taskRedux/taskSlice";
import { feedbackSlice } from "./feedbackRedux/feedbackSlice";

//Combined all reducer to root reducer
export const rootReducer = combineReducers({
  commonReducer: commonSlice.reducer,
  userReducer: userSlice.reducer,
  employeeReducer: employeeSlice.reducer,
  taskReducer: taskSlice.reducer,
  feedbackReducer: feedbackSlice.reducer,
});
