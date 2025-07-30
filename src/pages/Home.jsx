import Categories from "../components/home/Categories";
import Hero from "../components/home/Hero";
import LatestBlogs from "../components/home/LatestBlogs";
import BgImg from "../assets/images/bg.jpg";
import FeaturedAuthors from "../components/home/AuthorOfTheWeek";
import AuthorOfTheWeek from "../components/home/AuthorOfTheWeek";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 -z-10"
          style={{ backgroundImage: `url(${BgImg})` }}
        ></div>
        <div className="relative z-10">
          <LatestBlogs></LatestBlogs>
          <Categories></Categories>
        </div>
      </div>
      <AuthorOfTheWeek></AuthorOfTheWeek>
    </div>
  );
};

export default Home;
