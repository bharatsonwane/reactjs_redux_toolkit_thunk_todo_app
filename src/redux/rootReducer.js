import { combineReducers } from "redux";
import { globalStateSlice } from "./globalState_redux/globalState_slice";
import { userSlice } from "./user_redux/user_slice";
import { taskSlice } from "./task_redux/task_slice";

//Combined all reducer to root reducer
export const rootReducer = combineReducers({
  globalStateReducer: globalStateSlice.reducer,
  taskReducer: taskSlice.reducer,
  userReducer: userSlice.reducer,
});
