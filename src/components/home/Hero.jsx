import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import HeroImg from "../../assets/images/hero1.png";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Total Blogs", value: 1200 },
    { label: "Writers", value: 350 },
    { label: "Categories", value: 25 },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative bg-[#edf6ee] pb-32">
      {/* Hero Section */}
      <section className="w-11/12 mx-auto pt-10 flex flex-col-reverse md:flex-row items-center md:justify-between gap-10">
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

      {/* Stats Counter */}
      <section className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:-bottom-18 mt-5">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-[#fffdef] shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-4xl font-bold text-[#1b9c85]">
              <CountUp end={stat.value} duration={2} separator="," />
            </h2>
            <p className="text-gray-600 mt-2 text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Hero;
