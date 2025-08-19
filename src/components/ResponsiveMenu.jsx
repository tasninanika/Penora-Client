import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";

const ResponsiveMenu = ({ openNav, setOpenNav, logoutHandler }) => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-800 px-8 pb-6 pt-16 text-black dark:text-gray-100 md:hidden rounded-r-xl shadow-md transition-all`}
    >
      <div className="font-alegreya">
        <div className="flex items-center justify-start gap-3">
          {user ? (
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.photoUrl} size={50} />
            </Avatar>
          ) : (
            <FaUserCircle size={40} className="" />
          )}

          <div>
            <h2 className="">Welcome, {user?.firstName || "User"}</h2>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold ">
            <Link to="/" onClick={() => setOpenNav(false)}>
              <li className="cursor-pointer text-base">Home</li>
            </Link>
            <Link to="/blogs" onClick={() => setOpenNav(false)}>
              <li className="cursor-pointer text-base">Blog</li>
            </Link>
            <Link to="/about" onClick={() => setOpenNav(false)}>
              <li className="cursor-pointer text-base">About</li>
            </Link>
            {user ? (
              <Button
                onClick={() => {
                  logoutHandler(), setOpenNav(false);
                }}
              >
                Logout
              </Button>
            ) : (
              <Link to={"/signup"} onClick={() => setOpenNav(false)}>
                <Button className="w-full rounded-full btn btn-outline border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white dark:hover:text-black">
                  Signup
                </Button>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
