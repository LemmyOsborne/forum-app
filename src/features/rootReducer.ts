import { combineReducers } from "@reduxjs/toolkit"
import { themeReducer } from "./slices/themeSlice"
import { threadsReducer } from "./slices/threadsSlice"
import { authReducer } from "./slices/authSlice"

export const rootReducer = combineReducers({
  themeReducer,
  threadsReducer,
  authReducer,
})
