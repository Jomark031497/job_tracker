import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export const AuthRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/" /> : <Outlet />;
};
