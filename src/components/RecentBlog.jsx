import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCardList from "./BlogCardList";
import { useNavigate } from "react-router-dom";
import { setBlog } from "@/redux/blogSlice";
import axios from "axios";

const tags = [
  "Blogging",
  "Web Development",
  "Digital Marketing",
  "Cooking",
  "Photography",
  "Sports",
];

const RecentBlog = () => {
  const { blog } = useSelector((store) => store.blog);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllPublsihedBlogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/blog/get-published-blogs`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllPublsihedBlogs();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  const suggestedBlogs = [
    "The Rise of Modern Web Development",
    "Exploring the Future of Artificial Intelligence",
    "Mindful Living in a Busy World",
  ];

  return (
    <section className="w-11/12 mx-auto pt-40 pb-24">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-10">
        Latest Blogs
      </h2>

      {/* Two-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Blog Cards */}
        <div className="lg:col-span-2 space-y-6">
          {blog?.slice(0, 4)?.map((item, index) => (
            <BlogCardList key={index} blog={item} />
          ))}
        </div>

        {/* Right Side */}
        <div className="bg-white dark:bg-gray-700 shadow-md rounded-xl p-6 space-y-8">
          {/* Categories */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#e9f9ec] text-[#1b9c85] rounded-full text-sm cursor-pointer hover:bg-[#1b9c85] hover:text-white transition"
                  onClick={() => navigate(`/search?q=${cat}`)}
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
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#1b9c85] flex-1 bg-white"
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
              {suggestedBlogs.map((title, idx) => (
                <li
                  key={idx}
                  className="text-[#1b9c85] cursor-pointer hover:underline font-grotesk text-sm"
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentBlog;
