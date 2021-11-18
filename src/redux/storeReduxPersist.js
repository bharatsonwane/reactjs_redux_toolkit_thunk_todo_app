import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import history from "src/helper/history/history"
import rootReducer from './rootReducer';
// import redux-persist 
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist'



// redux-persist config
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = (history) => persistReducer(persistConfig, rootReducer(history))


// configure store
const store = configureStore({
    reducer: persistedReducer(history), // get history access in reducer with persist reducer
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(routerMiddleware(history)),
    devTools: true,
})

export const persistor = persistStore(store);
export default store;