import { createTheme, adaptV4Theme } from "@mui/material/styles";

export default createTheme(adaptV4Theme({
  palette: {
    mode: "light",
    primary: {
      main: "#5C1F99",
    },
    secondary: {
      main: "#8A1F99",
    },
    background: {
      paper: "rgba(255, 255, 255,1)",
      default: "rgba(230, 229, 233,1)",
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
