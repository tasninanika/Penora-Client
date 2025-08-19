import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const BlogCard = ({ blog, index }) => {
  const navigate = useNavigate();
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
  };
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 150}
      className="dark:bg-gray-800 dark:border-gray-600 p-5 rounded-2xl border border-gray-400 flex flex-col hover:shadow-xl hover:scale-[1.02] transition-all"
    >
      {/* Thumbnail */}
      <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          By <span className="font-medium">{blog.author.firstName}</span> •{" "}
          {blog.category} • {formattedDate}
        </p>

        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
          {blog.title}
        </h2>

        <h3 className="text-gray-600 dark:text-gray-300 text-sm flex-grow ">
          {stripHtml(blog.description).slice(0, 100)}...
        </h3>

        {/* Button aligned bottom */}
        <div className="mt-4 flex">
          <Button
            onClick={() => navigate(`/blogs/${blog._id}`)}
            className="rounded-full btn btn-outline border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white"
          >
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
