import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layouts/RootLayout";
import { Login } from "./features/auth/routes/Login";
import { SignUp } from "./features/auth/routes/SignUp";
import { AuthContextProvider } from "./contexts/Auth";
import { ProtectedRoute } from "./features/miscs/components/ProtectedRoute";
import { AuthRoute } from "./features/miscs/components/AuthRoute";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { Dashboard } from "./features/dashboard/components/Dashboard";
import { JobApplication } from "./features/job-applications/components/JobApplication";
import { SuspenseWithErrorBoundary } from "./features/miscs/components/SuspenseWithErrorBoundary";

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
                path: "/job-applications/:id",
                element: (
                  <SuspenseWithErrorBoundary
                    fallback={<>Loading...</>}
                    errorFallbackMessage="Unable to fetch job application"
                  >
                    <JobApplication />
                  </SuspenseWithErrorBoundary>
                ),
              },

              {
                path: "*",
                element: <>Page not found</>,
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
