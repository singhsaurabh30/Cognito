import { authApi } from "../features/api/authApi";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";


export const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer
});
