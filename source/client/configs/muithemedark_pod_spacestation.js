import { createTheme, adaptV4Theme } from "@mui/material/styles";

export default createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: "#3F7BBF", // A shade of blue resembling holographic displays
        contrastText: "#E1F5FE",
      },
      secondary: {
        main: "#FF6F00", // A warm orange for secondary content or actions
        contrastText: "#FFE0B2", // Light contrast for better legibility
      },
      mode: "dark",
      background: {
        paper: "rgba(25, 25, 25, 0.9)", // Dark shade resembling the depth of space
        default: "rgba(13, 13, 13, 0.95)", // An even darker shade for depth and contrast
      },
      text: {
        primary: "#BBDEFB",
        secondary: "#90CAF9",
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
            boxShadow: "0px 2px 12px rgba(63, 123, 191, 0.4)", // Giving a slight blue glow/shadow
          },
          containedPrimary: {
            backgroundColor: "#3F7BBF",
            "&:hover": {
              backgroundColor: "#305F8F",
            },
          },
          containedSecondary: {
            backgroundColor: "#FF6F00",
            "&:hover": {
              backgroundColor: "#CC5800",
            },
          },
        },
      },
      // ... Additional component style overrides if needed
    },
  })
);
