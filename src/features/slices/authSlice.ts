import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  user: string
}

const initialState: initialState = {
  user: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleUser: (state, { payload }: PayloadAction<typeof state.user>) => {
      state.user = payload
    },
    signOut: (state) => {
      state.user = ""
    },
  },
})

export const { handleUser } = authSlice.actions
export const { signOut } = authSlice.actions
export const authReducer = authSlice.reducer
