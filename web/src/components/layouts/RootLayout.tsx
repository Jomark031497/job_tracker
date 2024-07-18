import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Toaster } from "react-hot-toast";

export const RootLayout = () => {
  return (
    <>
      <div className="min-h-screen md:flex">
        <Header />
        <main className="flex-1 px-4">
          <div className="md:h-16" />
          <Outlet />
        </main>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
};
