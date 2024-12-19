import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface CircularProgressBarProps {
  text: string;
}

const CircularProgressBar = ({ text }: CircularProgressBarProps) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
    <span style={{ marginTop: "8px" }}>{text}</span>
  </Box>
);

export default CircularProgressBar;
