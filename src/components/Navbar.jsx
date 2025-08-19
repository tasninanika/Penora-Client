import { useState } from "react";
import { Button } from "./ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import Logo from "../assets/pen.gif";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import userLogo from "../assets/user.jpg";
import { HiMenuAlt1, HiMenuAlt3, HiSearch } from "react-icons/hi";
import {
  ChartBar,
  LogOut,
  MessageSquare,
  PencilLine,
  UserRound,
} from "lucide-react";
import { PiSunFill } from "react-icons/pi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaMoon } from "react-icons/fa";
import { toggleTheme } from "@/redux/themeSlice";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setOpenSearchModal(false);
    }
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  const linkClasses = ({ isActive }) =>
    `relative group text-base transition-colors duration-300 ${
      isActive
        ? "text-[#1b9c85]"
        : "text-gray-800 hover:text-[#1b9c85] dark:text-gray-200 dark:hover:text-[#1b9c85]"
    }`;

  return (
    <div className="py-2 fixed w-full dark:bg-gray-800 bg-[#edf6ee] z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
        {/* Left: Logo */}
        <Link to={"/"}>
          <div className="flex items-center">
            <img
              src={Logo}
              alt="Penora"
              className="h-10 md:w-16 md:h-16 dark:invert object-contain mb-3"
            />
            <h2 className="md:text-2xl font-alegreya text-xl font-bold bg-gradient-to-r from-[#1b9c85] to-gray-800 bg-clip-text text-transparent dark:text-[#1b9c85]">
              Penora
            </h2>
          </div>
        </Link>

        {/* Center: NavLinks */}
        <ul className="hidden md:flex gap-10 items-center text-lg font-alegreya">
          {["/", "/blogs", "/about"].map((path, i) => {
            const labels = ["Home", "Blogs", "About"];
            return (
              <NavLink key={path} to={path} className={linkClasses}>
                {labels[i]}{" "}
                <span className="absolute left-0 -bottom-4 w-0 h-[1px] bg-[#1b9c85] transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            );
          })}
        </ul>

        {/* Right: Theme + Auth/Profile + Search Icon */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <Button
            onClick={() => setOpenSearchModal(true)}
            className="bg-transparent hover:bg-transparent shadow-none p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <HiSearch className="text-black text-4xl dark:text-white" />
          </Button>

          {/* Theme Toggle */}
          <Button
            onClick={() => dispatch(toggleTheme())}
            className=" bg-transparent shadow-none dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
          >
            {theme === "light" ? (
              <FaMoon className="text-black" />
            ) : (
              <PiSunFill className="text-yellow-300 text-4xl" />
            )}
          </Button>

          {/* Auth / Profile */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-green-600">
                  <AvatarImage src={user.photoUrl || userLogo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60 dark:bg-gray-900 bg-white shadow-xl rounded-2xl p-2"
                align="end"
              >
                <DropdownMenuLabel className="text-center font-semibold text-lg border-b pb-2">
                  My Account
                </DropdownMenuLabel>

                <DropdownMenuGroup className="mt-2">
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/profile")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <UserRound className="w-5 h-5" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/your-blog")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <ChartBar className="w-5 h-5" />
                    <span>Your Blog</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/likes")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-red-600"
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
          5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
          4.5 2.09C13.09 3.81 14.76 3 16.5 
          3 19.58 3 22 5.42 22 8.5c0 
          3.78-3.4 6.86-8.55 11.54L12 
          21.35z"
                      />
                    </svg>
                    <span>Likes</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/comments")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Comments</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/write-blog")}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <PencilLine className="w-5 h-5" />
                    <span>Write Blog</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 text-red-600 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-8 items-center font-alegreya text-lg">
              <NavLink to="/login" className={linkClasses}>
                Sign In{" "}
                <span className="absolute left-0 -bottom-4 w-0 h-[1px] bg-[#1b9c85] transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
              <NavLink to="/signup" className={linkClasses}>
                Sign Up{" "}
                <span className="absolute left-0 -bottom-4 w-0 h-[1px] bg-[#1b9c85] transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </div>
          )}

          {/* Mobile Nav */}
          {openNav ? (
            <HiMenuAlt3 onClick={toggleNav} className="w-7 h-7 md:hidden" />
          ) : (
            <HiMenuAlt1 onClick={toggleNav} className="w-7 h-7 md:hidden" />
          )}
        </div>

        {/* Responsive Menu */}
        <ResponsiveMenu
          openNav={openNav}
          setOpenNav={setOpenNav}
          logoutHandler={logoutHandler}
        />
      </div>

      {/* Search Modal */}
      {openSearchModal && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setOpenSearchModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 max-w-md relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Search</h2>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                autoFocus
                type="text"
                placeholder="Type your search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <HiSearch />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
