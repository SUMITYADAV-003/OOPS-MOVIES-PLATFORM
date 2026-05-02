import {createBrowserRouter} from "react-router";
import Login from "./features/Auth/Pages/Login";







export const routers = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>
  },
  {
    path: "/login",
    element: <Login/>
  },
])