import { createTheme, adaptV4Theme } from "@mui/material/styles";

export default createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: "#0A74DA", // Cool blue for primary, resembling Tesla's logo color
        contrastText: "#FFFFFF", // Pure white for high contrast and luxury feel
      },
      secondary: {
        main: "#A4B0BE", // Luxurious, subtle silver resembling car interior
        contrastText: "#1A212F", // Deep dark blue for contrast
      },
      mode: "dark",
      background: {
        paper: "rgba(34, 40, 55, 1)", // Luxurious dark background resembling Tesla's interior
        default: "rgba(15, 20, 35, 1)", // Deeper shade for more depth
      },
      text: {
        primary: "#FFFFFF", // Pure white for primary text for a crisp look
        secondary: "#A4B0BE", // Slightly muted for secondary information
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
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700, // Bold for a striking and luxurious look
        letterSpacing: "0.05em", // Slight letter spacing for elegance
        lineHeight: "1.2",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600, // Slightly less bold for hierarchy
        letterSpacing: "0.05em", // Consistent letter spacing
        lineHeight: "1.3",
      },
      // ... Additional typography settings
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px", // Crisp, less rounded buttons
            textTransform: "none",
            boxShadow: "0px 4px 14px rgba(10, 116, 218, 0.5)", // More pronounced shadow for depth
          },
          containedPrimary: {
            backgroundColor: "#0A74DA",
            "&:hover": {
              backgroundColor: "#0562A3",
            },
          },
          containedSecondary: {
            backgroundColor: "#A4B0BE",
            "&:hover": {
              backgroundColor: "#8D9BA8",
            },
          },
        },
      },
      // ... Additional component style overrides
    },
  })
);
