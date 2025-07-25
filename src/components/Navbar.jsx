import { NavLink } from "react-router-dom";
import Pen from "../assets/images/pen.gif";

const Navbar = () => {
  const navLinkClasses =
    "relative group text-gray-800 hover:text-[#1b9c85] text-base";
  const navUnderline =
    "absolute left-0 -bottom-5 w-0 h-0.5 bg-[#1b9c85] transition-all duration-300 group-hover:w-full";

  return (
    <div className="w-11/12 mx-auto">
      <div className="navbar px-4">
        {/* Left - Brand */}
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

        {/* Center - Links */}
        <div className="navbar-center hidden md:flex space-x-6 font-alegreya">
          <NavLink to="/" className={navLinkClasses}>
            Home
            <span className={navUnderline}></span>
          </NavLink>
          <NavLink to="/blogs" className={navLinkClasses}>
            Blogs
            <span className={navUnderline}></span>
          </NavLink>
          <NavLink to="/about" className={navLinkClasses}>
            About
            <span className={navUnderline}></span>
          </NavLink>
        </div>

        {/* Right - Auth Links */}
        <div className="navbar-end hidden md:flex space-x-6 font-alegreya">
          <NavLink to="/signin" className={navLinkClasses}>
            Sign In
            <span className={navUnderline}></span>
          </NavLink>
          <NavLink to="/signup" className={navLinkClasses}>
            Sign Up
            <span className={navUnderline}></span>
          </NavLink>
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
                <NavLink to={item.path} className="hover:text-[#1b9c85]">
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
