import { useAppSelector } from "features/store"
import { ETheme } from "interfaces/interfaces"
import React from "react"
import { darkTheme, defaultTheme } from "styles/theme"
import { ThemeProvider } from "styled-components"

export const ToggleThemeProvider: React.FC = ({ children }) => {
  const { theme } = useAppSelector((state) => state.themeReducer)
  return (
    <ThemeProvider theme={theme === ETheme.Light ? defaultTheme : darkTheme}>
      {children}
    </ThemeProvider>
  )
}
