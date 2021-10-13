import { combineReducers } from "redux";
import { constantSlice } from "./constant_redux/constant_slice";
import { userSlice } from "./user_redux/user_slice";
import { employeeSlice } from "./employee_redux/employee_slice";
import { taskSlice } from "./task_redux/task_slice";
import { feedbackSlice } from "./feedback_redux/feedback_slice";

//Combined all reducer to root reducer
export const rootReducer = combineReducers({
  constantReducer: constantSlice.reducer,
  userReducer: userSlice.reducer,
  employeeReducer: employeeSlice.reducer,
  taskReducer: taskSlice.reducer,
  feedbackReducer: feedbackSlice.reducer,
});
