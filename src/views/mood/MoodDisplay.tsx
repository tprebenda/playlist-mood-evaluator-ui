import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridSortDirection,
} from "@mui/x-data-grid";
import AppBarHeader from "../../common/appBar/AppBar";
import { useMemo, useState } from "react";
import InfoDialog from "./InfoDialog";

const BROWN_HEX = "#B87333";
const SIGNIFICANT_CELL_BACKGROUND_COLOR = "black";
const DATA_COLUMNS = [
  "danceability",
  "energy",
  "speechiness",
  "acousticness",
  "instrumentalness",
  "valence",
];

// Adds green colored cell text if cell value is >= 0.65
const getCellStyling = (params: GridCellParams<any, any, number>) => {
  if (params.field === "name") {
    return "trackNameCell";
  }
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

  const topFeaturesUppercase = useMemo(
    () =>
      top_features
        .map((feature: string) => feature[0].toUpperCase() + feature.slice(1))
        .join(", "),
    [top_features]
  );

  const handleDialogOpen = () => {
    setInfoDialogIsOpen(true);
  };
  const handleDialogClose = () => {
    setInfoDialogIsOpen(false);
  };

  return (
    <>
      <AppBarHeader />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box sx={{ minWidth: 275, maxWidth: 500 }}>
          <Card variant="outlined">
            <CardContent>
              <Box textAlign="center" display="flex" flexDirection="column">
                <Typography
                  variant="h2"
                  color="brown"
                  fontFamily="IBM Plex Sans Condensed"
                  sx={{ marginBottom: "16px" }}
                >
                  "{playlistName}"
                </Typography>
                <Typography variant="h5" color="brown" gutterBottom>
                  Playlist Mood:
                </Typography>
                <Typography variant="h6" component="div" mb={2}>
                  {mood}
                </Typography>
                <Typography variant="h6" color="brown" gutterBottom>
                  Top Audio Feature Categories:
                </Typography>
                <Typography variant="body1">{topFeaturesUppercase}</Typography>
              </Box>
            </CardContent>
            <CardActions
              style={{
                justifyContent: "center",
                marginBottom: 5,
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
        <Typography variant="h6" color="green" mt={8} mb={2}>
          Top Songs That Contributed to this Overall Mood:
        </Typography>
        <Box
          sx={{
            height: "700px",
            width: "60%",
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
      </Box>
      <InfoDialog open={infoDialogIsOpen} handleClose={handleDialogClose} />
    </>
  );
};

export default MoodDisplay;
