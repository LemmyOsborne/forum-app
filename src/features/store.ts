import { configureStore } from "@reduxjs/toolkit"
import { Auth, Hub } from "aws-amplify"
import { ETheme } from "interfaces/interfaces"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"
import { rootReducer } from "./rootReducer"
import { hydrate } from "./slices/themeSlice"
import { handleUser } from "./slices/authSlice"

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

const fetchUser = async () => {
  const user = await Auth.currentAuthenticatedUser()
  return user
}

store.subscribe(() => {
  Hub.listen("auth", async () => {
    const user = await fetchUser()
    if (user) {
      store.dispatch(handleUser(user?.getUsername()))
    }
  })
})

if (persistedTheme) {
  store.dispatch(hydrate({ theme: persistedTheme }))
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
