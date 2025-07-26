import { useState } from "react";
import { motion } from "framer-motion";
import HeroImg from "../../assets/images/hero.png";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="w-11/12 mx-auto mt-8 flex flex-col-reverse md:flex-row items-center md:justify-between gap-10">
      {/* Left Side - Text */}
      <motion.div
        className="md:w-1/2 text-center md:text-left space-y-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-alegreya">
          Discover Amazing <span className="text-[#1b9c85]">Blogs</span> on
          Penora
        </h1>
        <p className="text-gray-600 text-lg">
          Read, explore, and share inspiring stories from writers across the
          globe.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center max-w-xs mx-auto md:mx-0 bg-transparent border border-gray-400 rounded-full px-4 py-2"
        >
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="text-[#1b9c85] font-semibold hover:underline"
          >
            Search
          </button>
        </form>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        className="md:w-1/2 flex justify-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src={HeroImg} alt="Hero" className="max-w-lg w-full" />
      </motion.div>
    </section>
  );
};

export default Hero;
