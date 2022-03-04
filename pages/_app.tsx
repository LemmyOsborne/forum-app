import { AppProps } from "next/app"
import React from "react"
import { ThemeProvider } from "styled-components"
import { theme } from "../styles/default-theme"
import { GlobalStyle } from "../styles/global-style"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
