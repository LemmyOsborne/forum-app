import { AppProps } from "next/app"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import { GlobalStyle } from "styles/global-style"
import { Amplify } from "aws-amplify"
import awsconfig from "../aws-exports"
import { AuthProvider } from "helpers/AuthProvider"
import { Header } from "components/Header"
import { ThreadsProvider } from "helpers/ThreadsProvider"
import { Provider } from "react-redux"
import store from "features/store"
import { ToggleThemeProvider } from "helpers/ThemeProvider"

Amplify.configure({ ...awsconfig, ssr: true })

const App = ({ Component, pageProps }: AppProps) => {
  const [showChild, setShowChild] = useState(false)

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  return <Child Component={Component} pageProps={pageProps} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Child = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Littl pet project, created in order to improve my hard skills as a frontend developer.It's a forum app, inspired by reddit. In development I used next js, typescript, aws amplify."
        ></meta>
        <title>Forum App</title>
      </Head>
      <Provider store={store}>
        <AuthProvider>
          <ToggleThemeProvider>
            <ThreadsProvider>
              <GlobalStyle />
              <Header />
              <Component {...pageProps} />
            </ThreadsProvider>
          </ToggleThemeProvider>
        </AuthProvider>
      </Provider>
    </>
  )
}

export default App
