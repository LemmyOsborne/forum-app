import { AppProps } from "next/app"
import Head from "next/head"
import React, { createContext, useState } from "react"
import { ThemeProvider } from "styled-components"
import { defaultTheme, darkTheme } from "styles/theme"
import { GlobalStyle } from "styles/global-style"
import { Amplify } from "aws-amplify"
import awsconfig from "../aws-exports"
import { AuthProvider } from "helpers/AuthProvider"
import { Header } from "components"

Amplify.configure({ ...awsconfig, ssr: true })

interface IToggleTheme {
  theme: "light" | "dark"
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>
}

export const ToggleThemeContext = createContext<IToggleTheme>({} as IToggleTheme)

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  return (
    <>
      <Head>
        <title>Forum App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
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
