import { combineReducers } from "@reduxjs/toolkit"
import { themeReducer } from "./slices/themeSlice"

export const rootReducer = combineReducers({
  themeReducer,
})
