import { createTheme, adaptV4Theme } from "@mui/material/styles";

export default createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: "#D32F2F", // A strong shade of red for primary actions and highlights
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#7B1E1E", // A deeper, muted red for secondary content or actions
        contrastText: "#D0A9A9", // Lighter contrast for better legibility with the deeper red
      },
      mode: "dark",
      background: {
        paper: "rgba(106, 21, 21, 0.15)", // Dark shade resembling the depth of space
        default: "rgba(211, 47, 47, 0.1)", // An even darker shade for depth and contrast
      },
      text: {
        primary: "#EFEFEF",
        secondary: "#B0B0B0",
      },
    },
    typography: {
      fontFamily: [
        "Orbitron", // Keeping the futuristic font
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
            borderRadius: "12px",
            textTransform: "none",
            boxShadow: "0px 2px 12px rgba(211, 47, 47, 0.4)", // Giving a slight red glow/shadow
          },
          containedPrimary: {
            backgroundColor: "#D32F2F",
            "&:hover": {
              backgroundColor: "#B01C1C",
            },
          },
          containedSecondary: {
            backgroundColor: "#7B1E1E",
            "&:hover": {
              backgroundColor: "#5A1515",
            },
          },
        },
      },
      // ... Additional component style overrides if needed
    },
  })
);
