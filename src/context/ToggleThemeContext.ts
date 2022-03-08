import { createContext } from "react"

interface IToggleTheme {
  theme: string | null
  setTheme: React.Dispatch<React.SetStateAction<string | null>>
}

export const ToggleThemeContext = createContext<IToggleTheme>({} as IToggleTheme)
