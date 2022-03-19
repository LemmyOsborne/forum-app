/* eslint-disable react/prop-types */
import { ListThreadsQuery, Thread } from "API"
import { API } from "aws-amplify"
import { ThreadsContext } from "context/ThreadsContext"
import { listThreads } from "graphql/queries"
import { useEffect, useState } from "react"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"

export const ThreadsProvider: React.FC = ({ children }) => {
  const [threads, setThreads] = useState<Thread[]>([] as Thread[])

  useEffect(() => {
    const getAllThreads = async () => {
      const { data } = (await API.graphql({
        query: listThreads,
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as { data: ListThreadsQuery }
      setThreads(data.listThreads?.items as Thread[])
    }
    getAllThreads()
  }, [])

  return (
    <ThreadsContext.Provider value={{ threads, setThreads }}>{children}</ThreadsContext.Provider>
  )
}
