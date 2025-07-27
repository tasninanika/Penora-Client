import { motion } from "framer-motion";
import blogImg from "../../assets/images/hero.png";

const LatestBlogs = () => {
  const blogs = [
    {
      id: 1,
      coverImage: blogImg,
      title: "Exploring the Beauty of Nature",
      excerpt:
        "Nature is an endless source of inspiration and beauty. Let's explore some of the most stunning places around the world...",
    },
    {
      id: 2,
      coverImage: blogImg,
      title: "Top 10 Tips for Writers",
      excerpt:
        "Writing is both an art and a skill. Here are 10 tips to help you sharpen your writing and reach a wider audience...",
    },
    {
      id: 3,
      coverImage: blogImg,
      title: "Technology Trends in 2025",
      excerpt:
        "The world of technology is ever-changing. Here’s what you need to know about the latest trends shaping our future...",
    },
  ];

  return (
    <section className="w-11/12 mx-auto mt-20">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Latest <span className="text-[#1b9c85]">Blogs</span>
      </h2>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {blog.excerpt}
              </p>
              <button className="mt-4 text-[#1b9c85] font-semibold hover:underline">
                Read More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestBlogs;
