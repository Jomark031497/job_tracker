import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaNetworkWired } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { MdOutlineLogout } from "react-icons/md";
import { logoutUser } from "../../features/auth/handlers/logoutUser";

const navLinks = [
  {
    label: "Dashboard",
    path: "/",
    icon: <MdDashboard />,
  },
  {
    label: "Applications",
    path: "/applications",
    icon: <FaNetworkWired />,
  },
  {
    label: "Profile",
    path: "/user/profile",
    icon: <FaUser />,
  },
  {
    label: "Settings",
    path: "/user/settings",
    icon: <IoMdSettings />,
  },
];

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
    <header className="w-[350px] flex flex-col gap-8 p-4">
      <div className="flex justify-center items-center h-16 border-b">
        <h1 className="text-2xl font-bold">LOGO</h1>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-4">
          {navLinks.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-xl">
              <i>{item.icon}</i>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  twMerge(
                    "transition-all hover:text-accent font-semibold",
                    isActive ? "text-primary" : "text-gray-500"
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex">
        <button className="text-2xl" onClick={handleLogout}>
          <MdOutlineLogout />
        </button>
      </div>
      {/* 
      <button onClick={handleLogout} className="p-2 bg-red-500">
        Logout
      </button> */}
    </header>
  );
};
