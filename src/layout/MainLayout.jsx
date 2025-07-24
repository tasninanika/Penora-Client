import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col mx-auto bg-[#edf6ee]">
      <Navbar></Navbar>
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
