/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ListThreadsQuery, Thread } from "API"
import { API } from "aws-amplify"
import { listThreads } from "graphql/queries"

export const fetchThreads = createAsyncThunk("threads/fetchThreads", async () => {
  const { data } = (await API.graphql({
    query: listThreads,
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as { data: ListThreadsQuery }
  console.log("data: ", data)
  return data.listThreads.items
})

interface InitialState {
  threads: Thread[]
}

const initialState: InitialState = {
  threads: [],
}

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchThreads.fulfilled, (state, { payload }: PayloadAction<Thread[]>) => {
      state.threads = payload
    })
  },
})

export const threadsReducer = threadsSlice.reducer
