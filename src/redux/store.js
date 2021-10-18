import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import history from "src/helper/history/history"
import rootReducer from './rootReducer';


const store = configureStore({
    reducer: rootReducer(history), // get history access in reducer
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
    devTools: true,
})

export default store;