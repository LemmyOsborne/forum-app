import { AppProps } from "next/app"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { defaultTheme, darkTheme } from "styles/theme"
import { GlobalStyle } from "styles/global-style"
import { Amplify } from "aws-amplify"
import awsconfig from "../aws-exports"
import { AuthProvider } from "helpers/AuthProvider"
import { Header } from "components"
import { ToggleThemeContext } from "context/ToggleThemeContext"

Amplify.configure({ ...awsconfig, ssr: true })

const App = ({ Component, pageProps }: AppProps) => {
  const checkWindow = (action: unknown) => {
    return typeof window !== undefined ? action : null
  }
  const [theme, setTheme] = useState<string | null>(null)

  useEffect(() => {
    if (theme === "light") {
      checkWindow(window.localStorage.setItem("theme", "light"))
      setTheme("light")
    } else {
      checkWindow(window.localStorage.setItem("theme", "dark"))
      setTheme("dark")
    }
  }, [theme])

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
        <title>Forum App</title>x
      </Head>
      <AuthProvider>
        <ToggleThemeContext.Provider value={{ theme, setTheme }}>
          <ThemeProvider theme={theme === "light" ? defaultTheme : darkTheme}>
            <GlobalStyle />
            <Header />
            <Component {...pageProps} />
          </ThemeProvider>
        </ToggleThemeContext.Provider>
      </AuthProvider>
    </>
  )
}

export default App
