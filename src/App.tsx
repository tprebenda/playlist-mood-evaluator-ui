import Login from "./views/login/Login";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/home/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
      children: [
        {
          path: "callback",
          element: <Login />,
        },
      ],
    },
    {
      path: "/home",
      element: <Home />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
