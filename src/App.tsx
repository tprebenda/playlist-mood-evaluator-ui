"use client";

import Login from "./views/login/Login";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./views/home/Home";
import { AuthProvider } from "./auth/hooks/useAuth";
import MoodDisplay from "./views/mood/MoodDisplay";
import About from "./views/about/About";
import ThemeWrapper from "./ThemeWrapper";
import NotFound from "./views/error/NotFound";
import ErrorPage from "./views/error/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import { OAuthCallback } from "./auth/callback/OAuthCallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes before data is considered stale
      gcTime: 10 * 60 * 1000, // 10 minutes before stale data is removed from cache
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Allows us to wrap the browser router in AuthProvider
// https://stackoverflow.com/a/74443785/11972470
const AuthLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

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
        element: <OAuthCallback />,
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        fallback={<ErrorPage />}
        onError={(error, errorInfo) => {
          console.error("App Error:", {
            error,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString(),
          });
        }}
      >
        <ThemeWrapper>
          <RouterProvider router={router} />
        </ThemeWrapper>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
