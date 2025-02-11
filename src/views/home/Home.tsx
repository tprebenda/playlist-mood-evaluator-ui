import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getPlaylists } from "../../api/playlists/getPlaylists";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
// import getUser from "../../api/user/getUser";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuth } from "../../hooks/useAuth";
import AppBarHeader from "../../common/appBar/AppBar";
import AppLogo from "../../common/appLogo/AppLogo";
import { pinkSunWallpaper } from "../../assets/wallpapers";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";
import { useErrorBoundary } from "react-error-boundary";
import CircularProgressBar from "../../common/circularProgressBar/CircularProgressBar";
import {
  LoadingStatus,
  loadingUserData,
  GAP_TO_BORDER,
  notLoading,
  UserPlaylist,
} from "../../common";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loadingStatus, setLoadingStatus] =
    useState<LoadingStatus>(loadingUserData);
  const [playlists, setPlaylists] = useState<UserPlaylist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<UserPlaylist | null>(
    null
  );
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const setupHomePage = async () => {
      try {
        const sessionPlaylists = sessionStorage.getItem("userPlaylists");
        if (sessionPlaylists) {
          setPlaylists(JSON.parse(sessionPlaylists));
        } else {
          const playlists = await getPlaylists();
          sessionStorage.setItem("userPlaylists", JSON.stringify(playlists));
          setPlaylists(playlists);
        }
        setLoadingStatus(notLoading);

        if (!isAuthenticated) {
          navigate("/login");
        }
      } catch (error) {
        showBoundary(error);
      }
    };
    setupHomePage();
  }, [isAuthenticated, navigate, showBoundary]);

  const allPlaylistNames = useMemo(
    () => playlists.map((playlist: UserPlaylist) => playlist.name),
    [playlists]
  );

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
    navigate("/mood", {
      state: {
        playlistId: selectedPlaylist.id,
        playlistName: selectedPlaylist.name,
      },
    });
  };

  return loadingStatus.isLoading === true ? (
    <CircularProgressBar text={loadingStatus.text} />
  ) : (
    <>
      <AppBarHeader />
      <BackgroundImage imageUrl={pinkSunWallpaper}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          width="30%"
          sx={{
            background: "black",
            borderRadius: "10%",
            border: "solid 1px",
            pb: GAP_TO_BORDER,
          }}
        >
          <AppLogo />
          <Typography
            color="green"
            sx={{
              typography: { xxl: "h5", xl: "h6", lg: "h7", xs: "body2" },
            }}
          >
            Welcome! Please select a playlist below:
          </Typography>
          <Box>
            <Autocomplete
              id="playlist-select"
              options={allPlaylistNames}
              onChange={onSelectedPlaylistChange}
              sx={{
                width: { xxl: 325, xl: 285, lg: 200, sm: 150 },
                mt: { xxl: 3, xl: 2, lg: 1, sm: 0.5 },
                mb: { xl: 1.5, lg: 1, sm: 0.5 },
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
            width="70%"
            sx={{
              mt: { xxl: 4, xl: 2.5, md: 2, xs: 1 },
            }}
          >
            <Typography
              sx={{
                typography: {
                  xxl: "body1",
                  md: "body2",
                  xs: "caption",
                },
              }}
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
