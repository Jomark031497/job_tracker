import { logoutUser } from "../../features/auth/handlers/logoutUser";

export const Header = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header>
      <button onClick={handleLogout} className="p-2 bg-red-500">
        Logout
      </button>
    </header>
  );
};
