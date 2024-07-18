import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaNetworkWired } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { MdOutlineLogout } from "react-icons/md";
import { logoutUser } from "../../features/auth/handlers/logoutUser";
import { RiMenu2Line } from "react-icons/ri";

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
    <header className="">
      <div className="flex h-16 w-full items-center px-4 md:hidden">
        <button className="rounded-full p-2 text-2xl transition-all hover:bg-gray-100 hover:text-accent">
          <RiMenu2Line />
        </button>
      </div>

      <div className="hidden h-screen md:flex md:w-[350px] md:flex-col md:border-r">
        <div className="flex h-16 items-center justify-center border-b">
          <h1 className="text-2xl font-bold">LOGO</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-xl">
                <i>{item.icon}</i>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    twMerge(
                      "font-semibold transition-all hover:text-accent",
                      isActive ? "text-primary" : "text-gray-500",
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
      </div>
    </header>
  );
};
