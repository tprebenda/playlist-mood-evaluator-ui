import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./Home.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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

// TODO: remove?
interface Home {
  signOut: () => void;
}

const Home = ({ signOut }: Home) => {
  return (
    // TODO: use standard <div> since MUI grid doesn't support col widths for direction="column"?
    // https://mui.com/material-ui/react-grid/#direction-column-column-reverse
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid item xs={4}></Grid>
      <Grid item xs={4} m={4}>
        <Box className="square pulse">
          <LogoTextfield text="Playlist" color="green" />
          <LogoTextfield text="Mood" color="black" />
          <LogoTextfield text="Evaluator" color="green" />
        </Box>
      </Grid>
      <Grid item xs={12} m={3}>
        <TextField variant="filled" label="Enter playlist name..." />
      </Grid>
      <Button
        size="large"
        variant="outlined"
        sx={{ color: "blue" }}
        onClick={signOut}
      >
        (Log out)
      </Button>
    </Grid>
  );
};

export default Home;
