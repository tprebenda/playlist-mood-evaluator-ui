import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./Home.css";
import Typography from "@mui/material/Typography";

interface TempHomeProps {
  signOut: () => void;
}
const Home = ({ signOut }: TempHomeProps) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button
        size="large"
        variant="outlined"
        sx={{ color: "blue", width: "15%" }}
        onClick={signOut}
      >
        Log out
      </Button>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={4} m={3}>
          <div className="circle pulse">
            <Typography variant="h3" fontFamily="IBM Plex Sans Condensed">
              Playlist Mood Evaluator
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
