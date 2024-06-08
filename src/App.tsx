// import logo from "./logo.svg";
import Login from "./views/login/Login";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/home/Home";

function App() {
  // TODO: move to component, use useNavigate()?
  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "http://localhost:3000/login";
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      // TODO: remove?
      path: "/callback",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home signOut={logout} />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
