import { combineReducers } from "@reduxjs/toolkit"
import { themeReducer } from "./slices/themeSlice"
import { threadsReducer } from "./slices/threadsSlice"

export const rootReducer = combineReducers({
  themeReducer,
  threadsReducer,
})
