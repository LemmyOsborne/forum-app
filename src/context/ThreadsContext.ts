import { Thread } from "API"
import { createContext, Dispatch, SetStateAction } from "react"

interface IThreadContext {
  threads: Thread[]
  setThreads: Dispatch<SetStateAction<Thread[]>>
}

export const ThreadsContext = createContext<IThreadContext>({} as IThreadContext)
