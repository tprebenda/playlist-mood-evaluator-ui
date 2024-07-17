import Login from "./views/login/Login";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./views/home/Home";
import { AuthProvider } from "./hooks/useAuth";
import MoodDisplay from "./views/mood/MoodDisplay";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
