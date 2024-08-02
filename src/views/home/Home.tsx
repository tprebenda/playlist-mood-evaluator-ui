import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  getPlaylists,
  PlaylistsResponse,
} from "../../api/playlists/getPlaylists";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import getUser from "../../api/user/getUser";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuth } from "../../hooks/useAuth";
import getPlaylistMood from "../../api/playlists/getPlaylistMood";
import AppBarHeader from "../../common/appBar/AppBar";
import AppLogo from "../../common/appLogo/AppLogo";
import { pinkSunWallpaper } from "../../assets/wallpapers";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";

type UserPlaylist = PlaylistsResponse;

interface LoadingStatus {
  isLoading: boolean;
  text: string;
}

const loadingUserData: LoadingStatus = {
  isLoading: true,
  text: "Loading User Profile data from Spotify...",
};

const loadingPlaylistData = (playlistName: string): LoadingStatus => ({
  isLoading: true,
  text: `Generating mood using the songs from your playlist: '${playlistName}'...`,
});

const notLoading: LoadingStatus = {
  isLoading: false,
  text: "",
};

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loadingStatus, setLoadingStatus] =
    useState<LoadingStatus>(loadingUserData);
  const [displayName, setDisplayName] = useState<string>("");
  const [playlists, setPlaylists] = useState<UserPlaylist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<UserPlaylist | null>(
    null
  );
  const allPlaylistNames = useMemo(
    () => playlists.map((playlist: UserPlaylist) => playlist.name),
    [playlists]
  );

  useEffect(() => {
    const setupHomePage = async () => {
      const { display_name } = await getUser();
      // If user display name is a string, use it. If it's just an ID, use `User ${ID}`
      const displayName =
        display_name && isNaN(+display_name)
          ? display_name
          : `User ${display_name}`;
      setDisplayName(displayName);

      const playlists = await getPlaylists();
      setPlaylists(playlists);
      setLoadingStatus(notLoading);
    };
    if (!isAuthenticated) {
      navigate("/login");
    }
    setupHomePage();
  }, [isAuthenticated, navigate]);

  const onSelectedPlaylistChange = (
    e: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (!playlists || !value) {
      setSelectedPlaylist(null);
      return;
    }
    const playlist = playlists.find(
      (playlist: UserPlaylist) => playlist.name === value
    );
    setSelectedPlaylist(playlist!);
  };

  const getMoodForSelectedPlaylist = async () => {
    if (!selectedPlaylist) {
      console.warn("Must select a playlist from the dropdown menu first!");
      return;
    }
    setLoadingStatus(loadingPlaylistData(selectedPlaylist.name));
    const playlistMoodDetails = await getPlaylistMood(selectedPlaylist.id);
    navigate("/mood", {
      state: { ...playlistMoodDetails, playlistName: selectedPlaylist.name },
    });
  };

  return loadingStatus.isLoading === true ? (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
      <span style={{ marginTop: "8px" }}>{loadingStatus.text}</span>
    </Box>
  ) : (
    <>
      <AppBarHeader />
      <BackgroundImage imageUrl={pinkSunWallpaper}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            height: { xl: "70%", lg: "80%", md: "65%" },
            width: { xl: "30%", lg: "40%", md: "60%" },
            background: "black",
            borderRadius: "10%",
            border: "solid 1px",
          }}
        >
          <AppLogo />
          <Typography
            fontFamily="IBM Plex Sans Condensed"
            color="green"
            sx={{ typography: { xl: "h4", lg: "h5" } }}
          >
            Welcome, {displayName}!
          </Typography>
          <Box>
            <Autocomplete
              id="playlist-select"
              options={allPlaylistNames}
              onChange={onSelectedPlaylistChange}
              sx={{
                width: { xl: 325, lg: 285, md: 200 },
                mt: { xl: 3, lg: 2, md: 0.5 },
                mb: { xl: 2, lg: 1, md: 0.5 },
              }}
              renderInput={(params) => (
                <TextField {...params} label="Playlist Name" />
              )}
            />
          </Box>
          <Button
            size="medium"
            variant="outlined"
            disabled={!selectedPlaylist}
            sx={{ color: selectedPlaylist ? "green" : "" }}
            onClick={getMoodForSelectedPlaylist}
          >
            Generate Mood for Playlist!
          </Button>
          <Box
            textAlign="center"
            sx={{
              maxWidth: { xl: "70%", lg: "85%", md: "90%" },
              mt: { xl: 4, lg: 2, md: 1 },
            }}
          >
            <Typography
              sx={{ typography: { xl: "body1", lg: "body2", md: "caption" } }}
            >
              After you have selected a playlist, click the button above to
              generate the mood. The app will pull all the songs from your
              provided playlist and use special 'Audio Feature' values provided
              by Spotify, to determine the overall mood.
              <br />
              <br />
              (A more detailed explanation will be available on the next page.)
            </Typography>
          </Box>
        </Box>
      </BackgroundImage>
    </>
  );
};

export default Home;
