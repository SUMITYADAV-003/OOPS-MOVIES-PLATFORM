import {createBrowserRouter} from "react-router";
import Login from "./features/Auth/Pages/Login";
import Register from "./features/Auth/Pages/Register";







export const routers = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
])