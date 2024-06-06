// import logo from "./logo.svg";
import OAuthCard from "./login";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <OAuthCard />,
  },
  {
    path: "/callback",
    element: <OAuthCard />,
  },
  {
    path: "/home",
    element: <div>HOME BABYYY</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
