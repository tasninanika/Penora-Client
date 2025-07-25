import { NavLink } from "react-router-dom";
import Pen from "../assets/images/pen.gif";

const Navbar = () => {
  const navLinkClasses = ({ isActive }) =>
    `relative group text-base transition-colors duration-300 ${
      isActive ? "text-[#1b9c85]" : "text-gray-800 hover:text-[#1b9c85]"
    }`;

  return (
    <div className="w-11/12 mx-auto">
      <div className="navbar px-4">
        {/* Left */}
        <div className="navbar-start flex items-center space-x-2">
          <img
            src={Pen}
            alt="Pen Icon"
            className="h-14 w-14 object-contain mb-2"
          />
          <NavLink
            to="/"
            className="font-alegreya text-2xl font-bold bg-gradient-to-r from-[#1b9c85] to-gray-800 bg-clip-text text-transparent"
          >
            Penora
          </NavLink>
        </div>

        {/* Center */}
        <div className="navbar-center hidden md:flex space-x-6 font-alegreya">
          {[
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
            { name: "About", path: "/about" },
          ].map((item) => (
            <NavLink key={item.name} to={item.path} className={navLinkClasses}>
              {item.name}
              <span className="absolute left-0 -bottom-4 w-0 h-[1px] bg-[#1b9c85] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </div>

        {/* Right */}
        <div className="navbar-end hidden md:flex space-x-6 font-alegreya">
          {[
            { name: "Sign In", path: "/signin" },
            { name: "Sign Up", path: "/signup" },
          ].map((item) => (
            <NavLink key={item.name} to={item.path} className={navLinkClasses}>
              {item.name}
              <span className="absolute left-0 -bottom-4 w-0 h-[1px] bg-[#1b9c85] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="dropdown dropdown-bottom dropdown-end md:hidden relative">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 left-0"
          >
            {[
              { name: "Home", path: "/" },
              { name: "Blogs", path: "/blogs" },
              { name: "About", path: "/about" },
              { name: "Sign In", path: "/signin" },
              { name: "Sign Up", path: "/signup" },
            ].map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "text-[#1b9c85]" : "hover:text-[#1b9c85]"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
