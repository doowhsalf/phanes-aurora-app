import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0ff", // Neon cyan, matching the span background
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057", // Bright neon pink, as in the current theme
      contrastText: "#fff",
    },
    background: {
      paper: "rgba(10, 10, 15, 0.95)",
      default: "rgba(5, 5, 10, 0.98)",
    },
    text: {
      primary: "#B5E3FF",
      secondary: "#7FBCD8",
    },
  },
  typography: {
    fontFamily: [
      "Orbitron",
      "Euristile",
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "14px",
          textTransform: "none",
          boxShadow: "0 0 20px #0ff, 0 0 30px #0ff, 0 0 40px #0ff",
        },
        containedPrimary: {
          backgroundColor: "#0ff",
          "&:hover": {
            backgroundColor: "#0ee",
            boxShadow: "0 0 25px #0ff, 0 0 35px #0ff, 0 0 45px #0ff",
          },
        },
        containedSecondary: {
          backgroundColor: "#f50057",
          "&:hover": {
            backgroundColor: "#e0004d",
            boxShadow: "0 0 25px #f50057, 0 0 35px #f50057, 0 0 45px #f50057",
          },
        },
      },
    },
    // ... Additional component style overrides if needed
  },
});

export default theme;
