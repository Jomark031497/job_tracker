import { Link } from "react-router-dom";
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
      <nav>
        <ul>
          <Link to="/about">about</Link>
          <Link to="/sys">sys</Link>
        </ul>
      </nav>

      <button onClick={handleLogout} className="p-2 bg-red-500">
        Logout
      </button>
    </header>
  );
};
