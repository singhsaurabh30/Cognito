import { authApi } from "../features/api/authApi";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { courseApi } from "../features/api/courseApi";


export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  auth: authReducer,
});
