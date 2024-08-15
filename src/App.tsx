"use client";

import Login from "./views/login/Login";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./views/home/Home";
import { AuthProvider } from "./hooks/useAuth";
import MoodDisplay from "./views/mood/MoodDisplay";
import About from "./views/about/About";
import ThemeWrapper from "./ThemeWrapper";
import NotFound from "./views/error/NotFound";
import ErrorPage from "./views/error/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";

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
      // Triggered by 'showBoundary' (via react-error-boundary package, the only thing that worked)
      errorElement: <ErrorPage />,
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
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    // (Using empty fallback element, because 'errorElement' defined above is used instead)
    <ErrorBoundary fallback={<></>}>
      <ThemeWrapper>
        <RouterProvider router={router} />
      </ThemeWrapper>
    </ErrorBoundary>
  );
}

export default App;
