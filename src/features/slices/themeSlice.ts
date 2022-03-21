import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ETheme } from "interfaces/interfaces"

interface IPayload {
  theme: ETheme
}

interface InitialState {
  theme: ETheme
}

const initialState: InitialState = {
  theme: ETheme.Dark,
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    hydrate: (_, { payload }: PayloadAction<IPayload>) => {
      return payload
    },
    changeTheme: (state, { payload }: PayloadAction<IPayload>) => {
      state.theme = payload.theme
    },
  },
})

export const themeReducer = themeSlice.reducer
export const { changeTheme } = themeSlice.actions
export const { hydrate } = themeSlice.actions
