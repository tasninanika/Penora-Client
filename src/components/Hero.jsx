import heroImg from "../assets/hero.json";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Lottie from "lottie-react";

const stats = [
  { value: 1200, label: "Blog Posts", bg: "#fffdef" },
  { value: 800, label: "Writers", bg: "#f0f7ff" },
  { value: 5000, label: "Categories", bg: "#fef6f6" },
];

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
      mirror: true,
    });
  }, []);

  return (
    <div className="relative px-4 md:px-0 bg-[#edf6ee] dark:bg-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center h-[600px] md:my-0 md:gap-20">
        {/* text section */}
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 ">
            Discover Amazing <span className="text-[#1b9c85]">Blogs</span> on
            Penora
          </h2>
          <p className="text-lg md:text-lg opacity-80 mb-6 ">
            Read, explore, and share inspiring stories from writers across the
            globe.
          </p>

          <Link to={"/dashboard/write-blog"}>
            <Button className="rounded-full btn btn-outline border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white">
              Get Started
            </Button>
          </Link>
        </div>

        {/* image section */}
        <div className="flex items-center justify-center relative">
          <Lottie
            animationData={heroImg}
            loop={true}
            className="md:h-[450px] md:w-[500px]"
          />
        </div>
      </div>

      {/* Stats Counter */}
      <section className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:-bottom-20 md:px-20 z-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            data-aos="flip-up"
            data-aos-delay={index * 200}
            style={{ backgroundColor: stat.bg }}
            className="shadow-md rounded-2xl p-8  transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-4xl font-bold text-[#1b9c85]">
              <CountUp
                end={stat.value}
                duration={5}
                separator=","
                enableScrollSpy={true}
              />
            </h2>
            <p className="text-gray-600 mt-2 text-lg">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Hero;
