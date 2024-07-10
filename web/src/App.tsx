import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layouts/RootLayout";
import { Login } from "./features/auth/routes/Login";
import { SignUp } from "./features/auth/routes/SignUp";
import { AuthContextProvider } from "./contexts/Auth";
import { ProtectedRoute } from "./features/miscs/components/ProtectedRoute";
import { AuthRoute } from "./features/miscs/components/AuthRoute";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { Dashboard } from "./features/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthContextProvider />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "/about",
                element: <>Badudi</>,
              },
              {
                path: "/sys",
                element: <>Badudi</>,
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            element: <AuthRoute />,
            children: [
              {
                index: true,
                element: <Navigate to="/auth/login" />,
              },
              {
                path: "login",
                element: <Login />,
              },
              {
                path: "sign-up",
                element: <SignUp />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
