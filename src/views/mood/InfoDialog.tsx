import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {
  DANCEABILITY,
  ENERGY,
  SPEECHNESS,
  ACOUSTICNESS,
  INSTRUMENTALNESS,
  VALENCE,
} from "./descriptions";
import { openInNewTab } from "../../helpers/link/linkHelpers";

const SPOTIFY_AUDIO_FEATURES_DOCS_URL =
  "https://developer.spotify.com/documentation/web-api/reference/get-audio-features";

interface CategoryTextProps {
  feature: string;
}

const AudioFeatureTitle = ({ feature }: CategoryTextProps) => (
  <Typography variant="body1" sx={{ marginTop: "10px", fontWeight: "bold" }}>
    {feature}
  </Typography>
);

interface InfoDialogProps {
  open: boolean;
  handleClose: () => void;
}

const InfoDialog = ({ open, handleClose }: InfoDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="info-dialog"
      aria-describedby="describes Spotify Audio features"
    >
      <DialogTitle id="alert-dialog-title" color="lightgreen">
        Where do these values come from?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          All of these values actually come from the Spotify Web Developer API.
          Every song in your playlist has a value for each of these 'Audio
          Features', as they are referred to by Spotify.
          <br />
          Taken directly from the{" "}
          <Link onClick={() => openInNewTab(SPOTIFY_AUDIO_FEATURES_DOCS_URL)}>
            Spotify Documentation,
          </Link>{" "}
          here is a description for each of the audio features used by my app:
          {/* <br /> */}
          <br />
          <AudioFeatureTitle feature="Danceability" />
          {DANCEABILITY}
          <br />
          <AudioFeatureTitle feature="Energy" />
          {ENERGY}
          <br />
          <AudioFeatureTitle feature="Speechiness" />
          {SPEECHNESS}
          <br />
          <AudioFeatureTitle feature="Acousticness" />
          {ACOUSTICNESS}
          <br />
          <AudioFeatureTitle feature="Instrumentalness" />
          {INSTRUMENTALNESS}
          <br />
          <AudioFeatureTitle feature="Valence" />
          {VALENCE}
          <br />
          <br />
          View the grid below to see which songs carried the most weight in your
          playlist's mood evaluation! You can sort columns by clicking on the
          column headers.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
