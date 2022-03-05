import { AppProps } from "next/app"
import Head from "next/head"
import React from "react"
import { ThemeProvider } from "styled-components"
import { theme } from "styles/default-theme"
import { GlobalStyle } from "styles/global-style"
import { Amplify } from "aws-amplify"
import awsconfig from "../aws-exports"
import { AuthProvider } from "helpers/AuthProvider"

Amplify.configure({ ...awsconfig, ssr: true })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Forum App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default App
