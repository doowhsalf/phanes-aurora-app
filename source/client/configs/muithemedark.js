import { createTheme, adaptV4Theme } from "@mui/material/styles";

export default createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: "#8E2CF6",
    },
    secondary: {
      main: "#A727DA",
    },
    mode: "dark",
    background: {
      paper: "rgba(32, 29, 38,1)",
      default: "rgba(41, 37, 47,1)",
    },
  },
  typography: {
    fontFamily: [
      "Raleway",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
}));
