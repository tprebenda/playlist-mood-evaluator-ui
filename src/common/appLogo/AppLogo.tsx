import "./AppLogo.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

let logoTheme = createTheme({
  typography: {
    fontFamily: `"Control Freak", "IBM Plex Sans Condensed", "Arial"`,
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

interface LogoTextfieldProps {
  text: string;
  color: string;
}

const LogoTextfield = ({ text, color }: LogoTextfieldProps) => {
  return (
    <Typography
      sx={{ typography: { xxl: "h2", xl: "h3", lg: "h5", md: "h6" } }}
      color={color}
    >
      {text}
    </Typography>
  );
};

const AppLogo = () => {
  return (
    <ThemeProvider theme={logoTheme}>
      <Box
        className="square pulse"
        sx={{
          mt: { xxl: 8, xl: 4, lg: 3, md: 3, sm: 3 },
          mb: { xxl: 5, xl: 2, lg: 2, md: 2, sm: 1 },
          width: { xxl: 285, xl: 200, lg: 125, md: 90, sm: 80 },
          height: { xxl: 285, xl: 200, lg: 125, md: 90, sm: 80 },
        }}
      >
        <LogoTextfield text="Playlist" color="green" />
        <LogoTextfield text="Mood" color="black" />
        <LogoTextfield text="Evaluator" color="green" />
      </Box>
    </ThemeProvider>
  );
};

export default AppLogo;
