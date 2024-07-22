import "./AppLogo.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface LogoTextfieldProps {
  text: string;
  color: string;
}

const LogoTextfield = ({ text, color }: LogoTextfieldProps) => {
  return (
    <Typography variant="h3" fontFamily="IBM Plex Sans Condensed" color={color}>
      {text}
    </Typography>
  );
};

const AppLogo = () => {
  return (
    <Box className="square pulse">
      <LogoTextfield text="Playlist" color="green" />
      <LogoTextfield text="Mood" color="black" />
      <LogoTextfield text="Evaluator" color="green" />
    </Box>
  );
};

export default AppLogo;
