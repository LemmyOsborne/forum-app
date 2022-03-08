import { Theme } from "styled-components"

export const defaultTheme: Theme = {
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F4EEFF",
      light: "#ba68c8",
      dark: "#bdbdbd",
      contrastText: "#fff",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#fff",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#fff",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
      contrastText: "#fff",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#fff",
    },
    grey: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.8)",
      disabled: "rgba(0, 0, 0, 0.3)",
    },
    background: {
      default: "#fff",
      header: "#EAEAEA",
    },
  },
  media: {
    sm: "600px",
    md: "900px",
    lg: "1200px",
  },
}

export const darkTheme: Theme = {
  ...defaultTheme,
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#D7DADC",
      light: "#EEEDDE",
      dark: "#9A9483",
      contrastText: "#000",
    },
    secondary: {
      main: "#212121",
      light: "#272727",
      dark: "#181818",
      contrastText: "#fff",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#fff",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#fff",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
      contrastText: "#fff",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#fff",
    },
    grey: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
    },
    background: {
      default: "#203239",
      header: "#191919",
    },
    text: {
      primary: "#fff",
      secondary: "#fff7",
      disabled: "#fff5",
    },
  },
}
