import Login from "./views/login/Login";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./views/home/Home";
import { AuthProvider } from "./hooks/useAuth";
import MoodDisplay from "./views/mood/MoodDisplay";
import About from "./views/about/About";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: `"IBM Plex Sans Condensed", "Arial"`,
    fontSize: 15,
  },
});

// Allows us to wrap the browser router in AuthProvider
// https://stackoverflow.com/a/74443785/11972470
const AuthLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

function App() {
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          // Alternative login path
          path: "/login",
          element: <Login />,
        },
        {
          // This is used as the redirect path for for Spotify OAuth2.0 Authorization Code Flow
          path: "/callback",
          element: <Login />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/mood",
          element: <MoodDisplay />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
  ]);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
