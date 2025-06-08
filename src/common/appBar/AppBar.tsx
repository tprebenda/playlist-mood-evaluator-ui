import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

type NavigatePaths = "/login" | "/home" | "/about" | "/mood";

const AppBarHeader = () => {
  const { isAuthenticated, endUserSession, logoutOfSpotify } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigateBack = () => {
    // Don't try to navigate back from /login, to avoid auth issues
    if (location.pathname === "/login") {
      return;
    }
    if (location.pathname === "/home") {
      navigate("/login");
      endUserSession();
    } else {
      navigate(-1);
    }
  };

  // Avoid cluttering navigation history when clicking the same path repeatedly
  const handleNavigationClick = (target: NavigatePaths) => {
    if (location.pathname !== target) {
      navigate(target);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "#83c3f7", color: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={navigateBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Button
            color="inherit"
            onClick={() => handleNavigationClick("/home")}
            disabled={!isAuthenticated}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => handleNavigationClick("/about")}
          >
            About
          </Button>
          <div style={{ flexGrow: 1 }}></div>
          <Button
            color="inherit"
            disabled={!isAuthenticated}
            onClick={logoutOfSpotify}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarHeader;
