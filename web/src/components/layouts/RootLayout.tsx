import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Toaster } from "react-hot-toast";

export const RootLayout = () => {
  return (
    <>
      <div className="md:flex">
        <Header />
        <main className="h-screen flex-1 overflow-auto px-4">
          <div className="md:h-16" />
          <Outlet />
        </main>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
};
