import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true; // added extra extra large breakpoint
  }
}

let theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: `"IBM Plex Sans Condensed", "Arial", "Good Times"`,
    fontSize: 15,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1900,
    },
  },
});
// https://mui.com/material-ui/customization/typography/#responsive-font-sizes
theme = responsiveFontSizes(theme);

interface ThemeWrapperProps {
  children: ReactNode;
}

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
