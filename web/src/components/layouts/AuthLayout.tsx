import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <Outlet />
      </main>
      <Toaster position="bottom-center" />
    </>
  );
};
