import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridSortDirection,
} from "@mui/x-data-grid";
import AppBarHeader from "../../common/appBar/AppBar";
import { RefObject, useMemo, useRef, useState } from "react";
import InfoDialog from "./InfoDialog";
import BackgroundImage from "../../common/backgroundImage/BackgroundImage";
import {
  synthMountainWallpaper,
  MOOD_WALLPAPERS,
} from "../../assets/wallpapers";
import AppLogo from "../../common/appLogo/AppLogo";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { openInNewTab } from "../../helpers/link/linkHelpers";
import SpotifyIcon from "../../common/spotify/SpotifyIcon";

const SIGNIFICANT_CELL_BACKGROUND_COLOR = "black";
const DATA_COLUMNS = [
  "danceability",
  "energy",
  "speechiness",
  "acousticness",
  "instrumentalness",
  "valence",
];

// Adds 'significantCell' class styling if field is a data column, and value is >= 0.65
const getCellStyling = (params: GridCellParams<any, any, number>) => {
  if (!DATA_COLUMNS.includes(params.field) || !params.value) {
    return "";
  }
  return params.value >= 0.65 ? "significantCell" : "";
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "Track Name",
    width: 225,
    headerClassName: "trackNameCell",
    renderCell: (params: GridCellParams<any, string>) => (
      <Link
        onClick={() => openInNewTab(params.row.url)}
        sx={{ color: "lightgreen", cursor: "pointer" }}
      >
        {params.value}
      </Link>
    ),
  },
  { field: "album", headerName: "Album", width: 225 },
  { field: "artists", headerName: "Artist(s)", width: 225 },
  { field: "danceability", headerName: "Danceability", width: 150 },
  { field: "energy", headerName: "Energy", width: 100 },
  { field: "speechiness", headerName: "Speechiness", width: 100 },
  { field: "acousticness", headerName: "Acousticness", width: 100 },
  { field: "instrumentalness", headerName: "Instrumentalness", width: 150 },
  { field: "valence", headerName: "Valence", width: 100 },
];

const sortingOrder: GridSortDirection[] = ["desc", "asc", null];

const MoodDisplay = () => {
  // Pull mood details that were passed as state in navigate()
  const { state } = useLocation();
  const { mood, top_features, top_tracks, playlistName } = state;
  const [infoDialogIsOpen, setInfoDialogIsOpen] = useState<boolean>(false);

  const displaySection = useRef<HTMLInputElement>(null);
  const gridSection = useRef<HTMLInputElement>(null);

  const scrollTo = (section: RefObject<HTMLInputElement>) => {
    section.current?.scrollIntoView({ behavior: "smooth" });
  };

  const topFeaturesUppercase = useMemo(
    () =>
      top_features
        .map((feature: string) => feature[0].toUpperCase() + feature.slice(1))
        .join(", "),
    [top_features]
  );

  const randomMoodWallpaper = useMemo(() => {
    const randomIdx = Math.floor(Math.random() * MOOD_WALLPAPERS.length);
    return MOOD_WALLPAPERS[randomIdx];
  }, []);

  const handleDialogOpen = () => {
    setInfoDialogIsOpen(true);
  };
  const handleDialogClose = () => {
    setInfoDialogIsOpen(false);
  };

  return (
    <Box
      position="relative"
      height="100vh"
      width="100%"
      sx={{
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      <Box ref={displaySection} sx={{ scrollSnapAlign: "start" }}>
        <AppBarHeader />
        <BackgroundImage imageUrl={randomMoodWallpaper}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="25%"
            sx={{
              background: "black",
              borderRadius: "10%",
              border: "solid 1px",
              paddingBottom: { xl: 4, lg: 2, xs: 1 },
            }}
          >
            <AppLogo />
            <Box maxWidth="70%">
              <Card variant="outlined">
                <CardContent>
                  <Box
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                    alignContent="space-around"
                    sx={{
                      gap: { xl: 1, md: 0.5, xs: 0 },
                    }}
                  >
                    <Typography
                      color="green"
                      sx={{
                        typography: { xxl: "h5", xs: "h5" },
                      }}
                    >
                      Playlist Name:
                    </Typography>
                    <Typography
                      sx={{
                        typography: { xxl: "h6", xs: "body1" },
                      }}
                      gutterBottom
                    >
                      "{playlistName}"
                    </Typography>
                    <Typography
                      color="green"
                      sx={{ typography: { xxl: "h5", xs: "h6" } }}
                    >
                      Playlist Mood:
                    </Typography>
                    <Typography
                      component="div"
                      sx={{ typography: { xxl: "h6", xs: "body1" } }}
                      gutterBottom
                    >
                      {mood}
                    </Typography>
                    <Typography
                      color="green"
                      sx={{ typography: { xxl: "h5", xs: "h6" } }}
                    >
                      Top Audio Feature Categories:
                    </Typography>
                    <Typography sx={{ typography: { xxl: "h6", xs: "body1" } }}>
                      {topFeaturesUppercase}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  style={{
                    justifyContent: "center",
                    marginTop: -14,
                  }}
                >
                  <Button
                    variant="text"
                    onClick={handleDialogOpen}
                    sx={{
                      textTransform: "none", // Disables standard MUI styling
                      textDecoration: "underline",
                      fontStyle: "italic",
                      color: "lightgray",
                      fontSize: "15px",
                    }}
                  >
                    What does this mean?
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Box>
          <Box
            zIndex={2}
            position="absolute"
            display="flex"
            flexDirection="column"
            alignContent="center"
            bottom="0%"
          >
            <Typography
              color="lightgray"
              sx={{
                typography: { xxl: "h6", xl: "body1" },
              }}
            >
              (Track Details)
            </Typography>
            <IconButton
              onClick={() => scrollTo(gridSection)}
              sx={{ borderRadius: 5 }}
            >
              <KeyboardArrowDownIcon
                sx={{ fontSize: { xxl: 70, xs: 45 }, color: "green" }}
              />
            </IconButton>
          </Box>
        </BackgroundImage>
      </Box>
      {/* DATA GRID: */}
      {/* TODO: extract to independent component */}
      <Box
        position="relative"
        ref={gridSection}
        sx={{ scrollSnapAlign: "end" }}
      >
        <BackgroundImage imageUrl={synthMountainWallpaper}>
          <Box
            zIndex={2}
            position="absolute"
            sx={{ top: { xl: "8%", xs: "9%" } }}
          >
            <IconButton
              onClick={() => scrollTo(displaySection)}
              sx={{ borderRadius: 5 }}
            >
              <KeyboardArrowUpIcon
                sx={{ fontSize: { xl: 70, xs: 45 }, color: "green" }}
              />
            </IconButton>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="70%"
            height="65%"
            sx={{
              background: "black",
              borderRadius: "3%",
              border: "solid 1px",
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              mt={4}
              mb={3}
              gap={1.5}
            >
              <SpotifyIcon />
              <Typography
                color="green"
                sx={{
                  typography: { xl: "h5", md: "h6", sm: "body1", xs: "body2" },
                }}
              >
                Top Songs That Contributed to this Overall Mood
              </Typography>
              <SpotifyIcon />
            </Box>
            <Box
              sx={{
                height: "70%",
                width: "90%",
              }}
            >
              <DataGrid
                rows={top_tracks}
                columns={columns}
                sortingOrder={sortingOrder}
                getCellClassName={(params) => getCellStyling(params)}
                initialState={{
                  columns: {
                    columnVisibilityModel: {
                      id: false,
                    },
                  },
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
                pageSizeOptions={[10, 20, 60]}
                sx={{
                  ".significantCell": {
                    color: "green",
                    fontWeight: "bold",
                    bgcolor: SIGNIFICANT_CELL_BACKGROUND_COLOR,
                  },
                  ".trackNameCell": {
                    color: "lightgreen",
                  },
                  fontSize: "15px",
                }}
              />
            </Box>
            <Typography
              color="green"
              sx={{
                typography: {
                  xxl: "h6",
                  md: "body1",
                  xs: "body2",
                },
                mt: { xxl: 4, xs: 2 },
              }}
            >
              (You can sort columns by clicking on the column header.)
            </Typography>
          </Box>
        </BackgroundImage>
        <InfoDialog open={infoDialogIsOpen} handleClose={handleDialogClose} />
      </Box>
    </Box>
  );
};

export default MoodDisplay;
