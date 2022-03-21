import { configureStore } from "@reduxjs/toolkit"
import { ETheme } from "interfaces/interfaces"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"
import { rootReducer } from "./rootReducer"
import { hydrate } from "./slices/themeSlice"

const persistedTheme = (typeof window !== "undefined" && localStorage.getItem("theme")) as ETheme

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    themeReducer: {
      theme: persistedTheme,
    },
  },
})

store.subscribe(() => {
  typeof window !== "undefined" &&
    localStorage.setItem("theme", store.getState().themeReducer.theme)
})

if (persistedTheme) {
  store.dispatch(hydrate({ theme: persistedTheme }))
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
