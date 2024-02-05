import { createTheme, adaptV4Theme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#0ff", // Neon cyan for a more futuristic look
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057", // Bright neon pink for contrast
      contrastText: "#fff",
    },
    mode: "dark",
    background: {
      paper: "rgba(10, 10, 15, 0.95)", // Dark background to mimic the space environment
      default: "rgba(5, 5, 10, 0.98)", // Even darker shade for the backdrop
      // paper: "rgba(16, 18, 27,0.95)",
      // default: "rgba(36, 39, 59, 0.3)",
    },
    text: {
      primary: "#B5E3FF", // Light blue to maintain readability
      secondary: "#7FBCD8", // Muted blue for secondary information
    },
  },
  typography: {
    fontFamily: [
      "Raleway",

      "Orbitron",
      "Euristile",
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
        },
        containedPrimary: {
          backgroundColor: "#0ff",
          "&:hover": {
            backgroundColor: "#0ee",
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
