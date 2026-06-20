import FaceExpressionDetector from "./features/expression/components/facexpression.jsx";
import "./features/shared/styles/global.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context.jsx";
function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
