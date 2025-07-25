import { Link } from "react-router-dom";
import Pen from "../assets/images/pen.gif";

const Navbar = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="navbar px-4">
        {/* Left - Brand */}
        <div className="navbar-start">
          <img src={Pen} alt="" />
          <Link
            to="/"
            className="font-alegreya text-2xl font-bold bg-gradient-to-r from-[#1b9c85] to-gray-800 bg-clip-text text-transparent"
          >
            Penora
          </Link>
        </div>

        {/* Center - Links */}
        <div className="navbar-center hidden md:flex space-x-6 font-alegreya">
          {["Home", "Blogs", "About"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className="relative group text-gray-800 hover:text-[#1b9c85] text-base"
            >
              {item}
              <span className="absolute left-0 -bottom-5 w-0 h-0.5 bg-[#1b9c85] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right - Auth Links */}
        <div className="navbar-end hidden md:flex space-x-6 font-alegreya">
          {["Sing In", "Sign Up"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="relative group text-gray-800 hover:text-[#1b9c85] text-base"
            >
              {item}
              <span className="absolute left-0 -bottom-5 w-0 h-0.5 bg-[#1b9c85] transition-all duration-300 group-hover:w-full"></span>
            </Link>
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
            {["Home", "Blogs", "About", "Login", "Register"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${
                    item.toLowerCase() === "home" ? "" : item.toLowerCase()
                  }`}
                  className="hover:text-[#1b9c85]"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
