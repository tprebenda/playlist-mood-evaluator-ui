import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridSortDirection,
} from "@mui/x-data-grid";
import { openInNewTab } from "../../helpers/link/linkHelpers";
import { TrackDetails } from "../../common";

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

interface MoodGridProps {
  topTracks: TrackDetails[];
}

const MoodGrid = ({ topTracks }: MoodGridProps) => {
  return (
    <Box height="100%">
      <DataGrid
        rows={topTracks}
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
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default MoodGrid;
