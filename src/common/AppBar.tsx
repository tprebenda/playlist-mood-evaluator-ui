import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AppBarWithLogout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#83c3f7", color: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Button color="inherit" onClick={() => navigate("/about")}>
            About
          </Button>
          <div style={{ flexGrow: 1 }}></div>
          <Button color="inherit" disabled={!isAuthenticated} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarWithLogout;
