import "./AppLogo.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface LogoTextfieldProps {
  text: string;
  color: string;
}

const LogoTextfield = ({ text, color }: LogoTextfieldProps) => {
  return (
    <Typography
      sx={{ typography: { xl: "h3", lg: "h4", md: "h6" } }}
      fontFamily="IBM Plex Sans Condensed"
      color={color}
    >
      {text}
    </Typography>
  );
};

const AppLogo = () => {
  return (
    <Box
      className="square pulse"
      sx={{
        mt: { xl: 8, lg: 4, md: 3 },
        mb: { xl: 5, lg: 2, md: 2 },
        width: { xl: 285, lg: 200, md: 125 },
        height: { xl: 285, lg: 200, md: 125 },
      }}
    >
      <LogoTextfield text="Playlist" color="green" />
      <LogoTextfield text="Mood" color="black" />
      <LogoTextfield text="Evaluator" color="green" />
    </Box>
  );
};

export default AppLogo;
