import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import storage from 'redux-persist/lib/storage'
import {persistReducer , persistStore} from 'redux-persist'
import {combineReducers} from "@reduxjs/toolkit";
const persistConfig = {
    key: 'root',
    version: 1,
    storage
}


const rootReducer = combineReducers({user: authSlice});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({reducer: persistedReducer})
 export const persistor = persistStore(store);
export default store;
