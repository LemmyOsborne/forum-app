/* eslint-disable react/prop-types */
import { ListThreadsQuery, Thread } from "API"
import { API } from "aws-amplify"
import { ThreadsContext } from "context/ThreadsContext"
import { listThreads } from "graphql/queries"
import { useEffect, useState } from "react"

export const ThreadsProvider: React.FC = ({ children }) => {
  const [threads, setThreads] = useState<Thread[]>([] as Thread[])

  useEffect(() => {
    const getAllThreads = async () => {
      const { data } = (await API.graphql({
        query: listThreads,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: ListThreadsQuery }
      setThreads(data.listThreads?.items as Thread[])
    }
    getAllThreads()
  }, [])

  return (
    <ThreadsContext.Provider value={{ threads, setThreads }}>{children}</ThreadsContext.Provider>
  )
}
