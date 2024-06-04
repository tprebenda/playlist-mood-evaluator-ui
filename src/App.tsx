// import logo from "./logo.svg";
import OAuthCard from "./login";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OAuthCard />,
  },
  // {
  //   path: "about",
  //   element: <div>About</div>,
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
