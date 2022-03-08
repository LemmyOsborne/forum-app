import "styled-components"

interface IPallete {
  main: string
  light: string
  dark: string
  contrastText: string
}

declare module "styled-components" {
  export interface Theme {
    palette: {
      common: {
        black: string
        white: string
      }
      primary: IPallete
      secondary: IPallete
      error: IPallete
      warning: IPallete
      info: IPallete
      success: IPallete
      grey: {
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
      }
      text: {
        primary: string
        secondary: string
        disabled: string
      }
      background: {
        default: string
        header: string
      }
    }
    media: {
      sm: "600px"
      md: "900px"
      lg: "1200px"
    }
  }
}
