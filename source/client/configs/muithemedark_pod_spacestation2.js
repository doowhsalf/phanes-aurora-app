import { createTheme, adaptV4Theme } from "@mui/material/styles";

export default createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: "#2C83B9", // Electric blue derived from the holographic displays
        contrastText: "#E1F5FE",
      },
      secondary: {
        main: "#D93853", // Fiery red derived from some of the controls, offering contrast
        contrastText: "#FEE6E9", // Light rosy hue for legibility on red backgrounds
      },
      info: {
        main: "#17a2b8", // Light teal for info
      },
      warning: {
        main: "#ffc107", // Bright amber for warning
      },
      success: {
        main: "#28a745", // Luminous green for success
      },
      error: {
        main: "#dc3545", // Darker crimson for error
      },
      mode: "dark",
      background: {
        paper: "rgba(16, 16, 22, 0.9)", // Slightly off-black, evoking the metal interiors
        default: "rgba(10, 10, 15, 0.95)", // Deepest black for the broader backdrop
      },
      text: {
        primary: "#B5E3FF", // Crisp blue text that stands out against the dark backgrounds
        secondary: "#7FBCD8", // A muted blue for secondary info
      },
    },
    typography: {
      fontFamily: [
        "Orbitron", // Keeping the futuristic font
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
            boxShadow: "0px 3px 15px rgba(44, 131, 185, 0.5)", // Amplified blue glow, evoking the holographic essence
          },
          containedPrimary: {
            backgroundColor: "#2C83B9",
            "&:hover": {
              backgroundColor: "#236B97",
            },
          },
          containedSecondary: {
            backgroundColor: "#D93853",
            "&:hover": {
              backgroundColor: "#B0203A",
            },
          },
        },
      },
      // ... Additional component style overrides if needed
    },
  })
);
