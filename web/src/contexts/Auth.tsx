import { createContext, useEffect, useState } from "react";
import { User } from "../features/users/users.types";
import { getAuthenticatedUser } from "../features/auth/handlers/getAuthenticatedUser";
import { Outlet, useNavigate } from "react-router-dom";

export interface AuthContextType {
  user: User | null;
  handleSetUser: (value: User) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const handleSetUser = (value: User) => {
    setUser(value);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticatedUser = await getAuthenticatedUser();
        setUser(authenticatedUser);
        navigate("/");
      } catch (error) {
        console.error(error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, handleSetUser }}>
      {!isInitialLoading && <Outlet />}
    </AuthContext.Provider>
  );
};
