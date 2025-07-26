import { motion } from "framer-motion";
import CountUp from "react-countup";

const StatsCounter = () => {
  const stats = [
    { label: "Total Blogs", value: 1200 },
    { label: "Writers", value: 350 },
    { label: "Categories", value: 25 },
  ];

  return (
    <section className="w-11/12 mx-auto mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-4xl font-bold text-[#1b9c85]">
            <CountUp end={stat.value} duration={2} separator="," />
          </h2>
          <p className="text-gray-600 mt-2 text-lg">{stat.label}</p>
        </motion.div>
      ))}
    </section>
  );
};

export default StatsCounter;
