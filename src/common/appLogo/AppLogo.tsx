import "./AppLogo.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

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
      sx={{
        typography: { xxl: "h2", xl: "h3", lg: "h5", sm: "h6", xs: "body1" },
      }}
      color={color}
    >
      {text}
    </Typography>
  );
};

const AppLogo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onLogoClick = () => {
    if (location.pathname === "/mood" || location.pathname === "/about") {
      navigate("/home");
    }
  };

  return (
    <ThemeProvider theme={logoTheme}>
      <Box
        className="square pulse"
        onClick={onLogoClick}
        sx={{
          mt: { xxl: 7, xl: 4, xs: 3 },
          mb: { xxl: 5, md: 2, xs: 1 },
          width: { xxl: 285, xl: 200, lg: 125, md: 90, xs: 80 },
          height: { xxl: 285, xl: 200, lg: 125, md: 90, xs: 80 },
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
