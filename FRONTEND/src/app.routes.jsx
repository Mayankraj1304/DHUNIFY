import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/register.jsx";
import Login from "./features/auth/pages/login.jsx";
import Protected from "./features/auth/components/protected.jsx";
import Home from "./features/home/pages/Home.jsx"
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);
