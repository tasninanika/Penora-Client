import Hero from "@/components/Hero";
import RecentBlog from "@/components/RecentBlog";
import PopularAuthors from "@/components/PopularAuthors";
import BgImg from "../assets/bg.jpg";
import Categories from "@/components/ui/Categories";
const Home = () => {
  return (
    <div className="pt-20">
      <Hero />
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 "
          style={{ backgroundImage: `url(${BgImg})` }}
        ></div>
        <div className="relative z-10">
          <RecentBlog />
          <Categories></Categories>
        </div>
      </div>
      <PopularAuthors />
    </div>
  );
};

export default Home;
