import { useState } from "react";
import BlogImg from "../../assets/images/blog.jpg";

const LatestBlogs = () => {
  const [email, setEmail] = useState("");

  const blogs = [
    {
      id: 1,
      title: "Understanding React Hooks",
      author: "John Doe",
      date: "July 23, 2025",
      image: BlogImg,
      description:
        "A beginner's guide to React Hooks and how they simplify state management in functional components.",
    },
    {
      id: 2,
      title: "Why TailwindCSS is so Popular?",
      author: "Jane Smith",
      date: "July 22, 2025",
      image: BlogImg,
      description:
        "Exploring the rise of TailwindCSS and its utility-first approach to building modern UIs.",
    },
    {
      id: 3,
      title: "JavaScript Tips for Beginners",
      author: "Robert Green",
      date: "July 20, 2025",
      image: BlogImg,
      description:
        "These 10 tips will help you write cleaner, more efficient JavaScript code.",
    },
  ];

  const categories = ["Technology", "Design", "Lifestyle", "Travel", "Finance"];
  const suggestedBlogs = [
    "Mastering Next.js Routing",
    "10 CSS Tricks You Must Know",
    "Top 5 AI Tools for Developers",
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <section className="w-11/12 mx-auto py-40">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
        Latest Blogs
      </h2>

      {/* Two-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Blog Cards */}
        <div className="lg:col-span-2 space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border border-green-200 bg-[#f3f8f4] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row h-40"
            >
              {/* Image Left */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full md:w-1/3 h-full object-cover p-5 rounded-lg"
              />
              {/* Text Right */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {blog.title}
                  </h2>
                  <p className="text-gray-500 text-xs mb-2">
                    By {blog.author} • {blog.date}
                  </p>
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {blog.description}
                  </p>
                </div>
                <button className="text-[#1b9c85] text-sm font-semibold hover:underline self-start">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-8">
          {/* Categories */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#e9f9ec] text-[#1b9c85] rounded-full text-sm cursor-pointer hover:bg-[#1b9c85] hover:text-white transition"
                >
                  #{cat}
                </span>
              ))}
            </div>
          </div>

          {/* Subscribe Newsletter */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Subscribe to Newsletter
            </h2>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 flex-col sm:flex-row"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#1b9c85] flex-1"
                required
              />
              <button
                type="submit"
                className="bg-[#1b9c85] text-white px-4 py-2 rounded-lg hover:bg-[#15806d] transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Suggested Blogs */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Suggested Blogs</h2>
            <ul className="space-y-2">
              {suggestedBlogs.map((blog, idx) => (
                <li
                  key={idx}
                  className="text-[#1b9c85] cursor-pointer hover:underline font-grotesk text-sm"
                >
                  {blog}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
