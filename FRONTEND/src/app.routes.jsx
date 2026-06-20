import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/register.jsx";
import Login from "./features/auth/pages/login.jsx";
export const router = createBrowserRouter([
  { path: "/", element: <h1>home</h1> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);
