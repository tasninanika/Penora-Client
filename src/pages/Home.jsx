import Hero from "../components/home/Hero";
import LatestBlogs from "../components/home/LatestBlogs";

const Home = () => {
  return (
    <div>
      <div className="bg-[#edf6ee] md:px-18">
        <Hero />
      </div>
      <div className="bg-white">
        <LatestBlogs />
      </div>
    </div>
  );
};

export default Home;
