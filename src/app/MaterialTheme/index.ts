import { createTheme, ThemeOptions } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Shadows } from "@mui/material/styles";
import { common } from "@mui/material/colors";
import shadow from "./shadow";
import typography from "./typography";

const light: ThemeOptions = {
  palette: {
    mode: "light" as const,
    background: {
      default: "#f8f8ff",
      paper: common.white,
    },
    primary: {
      contrastText: "#ffffff",
      main: "#343434", // Charcoal
    },
    secondary: {
      contrastText: "#343434",
      main: "#d7b586", // Muted Gold
    },
    text: {
      primary: "#343434",
      secondary: "#6b6b6b",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: { background: "#f4f6f8", height: "100%", minHeight: "100%" },
      },
    },
  },
  typography: typography as TypographyOptions,
  shadows: shadow as Shadows,
};

let theme = createTheme(light);
theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1300px",
          },
        },
      },
    },
  },
});

export default theme;
