import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Toaster } from "react-hot-toast";

export const RootLayout = () => {
  return (
    <>
      <div className="flex min-h-screen gap-4">
        <Header />
        <main className="flex-1 p-4">
          <div className="h-20" />
          <Outlet />
        </main>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
};
