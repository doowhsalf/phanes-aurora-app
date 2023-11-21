import { createTheme, adaptV4Theme } from "@mui/material/styles";

export default createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: "#0A74DA", // Cool blue for primary
        contrastText: "#E6F7FF", // Text contrast for better legibility
      },
      secondary: {
        main: "#B3C5D9", // Silvery secondary color
        contrastText: "#1C2530", // Dark contrast for secondary color
      },
      mode: "dark",
      background: {
        paper: "rgba(28, 37, 48, 1)", // Dark space-like color for paper
        default: "rgba(10, 14, 25, 1)", // Even darker space-like color for default
      },
      text: {
        primary: "#E6F7FF", // Text that pops out in the dark theme
        secondary: "#AEBECE", // Slightly muted text for secondary information
      },
    },
    typography: {
      fontFamily: 
      [
        "orbitron",
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
      h1: {
        fontSize: "2rem",
        fontWeight: 500,
        letterSpacing: "0.1em",
      },
      h2: {
        fontSize: "1.75rem",
        fontWeight: 400,
        letterSpacing: "0.1em",
      },
      // ... Additional typography settings
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px", // Rounded buttons for a futuristic feel
            textTransform: "none", // Avoid uppercase transformation for a cleaner look
            boxShadow: "0px 2px 10px rgba(10, 116, 218, 0.3)", // Slight glow to emphasize the space theme
          },
          containedPrimary: {
            backgroundColor: "#0A74DA", // Primary color for buttons
            "&:hover": {
              backgroundColor: "#0562A3", // Darkened on hover
            },
          },
          containedSecondary: {
            backgroundColor: "#B3C5D9", // Secondary color for buttons
            "&:hover": {
              backgroundColor: "#91A6B8", // Darkened on hover
            },
          },
        },
      },
      // ... Additional component style overrides
    },
  })
);
