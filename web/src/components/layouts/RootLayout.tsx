import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Toaster } from "react-hot-toast";

export const RootLayout = () => {
  return (
    <>
      <div className="flex min-h-screen gap-2">
        <Header />
        <main className="bg-red-500 flex-1">
          <Outlet />
        </main>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
};
