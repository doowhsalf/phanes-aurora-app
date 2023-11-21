import { createTheme, adaptV4Theme } from "@mui/material/styles";

export default createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: "#B5402A", // Warm, sophisticated red
        contrastText: "#F8F1E4", // Soft, warm white
      },
      secondary: {
        main: "#DAA589", // Warm, smooth secondary color
        contrastText: "#2D241E", // Deep, sophisticated brown
      },
      mode: "dark",
      background: {
        paper: "rgba(45, 36, 30, 1)", // Deep, warm brown resembling a sophisticated interior
        default: "rgba(33, 26, 23, 1)", // Deeper shade for more depth
      },
      text: {
        primary: "#F8F1E4", // Soft, warm white for a smooth look
        secondary: "#DAA589", // Warm, soft secondary color for text
      },
    },
    typography: {
      fontFamily: [
        "Playfair Display", // Elegant and sophisticated
        "Georgia",
        "serif",
      ].join(","),
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        lineHeight: "1.2",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        lineHeight: "1.3",
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        letterSpacing: "0.03em",
        lineHeight: "1.5",
      },
      // ... Additional typography settings
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px", // Slightly rounded buttons for a smooth feel
            textTransform: "none",
            boxShadow: "0px 4px 14px rgba(181, 64, 42, 0.5)", // Soft shadow with a warm tint
          },
          containedPrimary: {
            backgroundColor: "#B5402A",
            "&:hover": {
              backgroundColor: "#932D20",
            },
          },
          containedSecondary: {
            backgroundColor: "#DAA589",
            "&:hover": {
              backgroundColor: "#C79376",
            },
          },
        },
      },
      // ... Additional component style overrides
    },
  })
);
