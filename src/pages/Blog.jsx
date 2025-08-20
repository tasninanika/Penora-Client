import BlogCard from "@/components/BlogCard";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "@/redux/blogSlice";
import BgImg from "../assets/bg.jpg";

const Blog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  useEffect(() => {
    const getAllPublsihedBlogs = async () => {
      try {
        const res = await axios.get(
          `https://penora-server.onrender.com/api/v1/blog/get-published-blogs`,
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

  return (
    <div className="relative pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-10 opacity-10"
        style={{ backgroundImage: `url(${BgImg})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center">
        <h2 className="text-4xl font-bold text-center pt-16 text-white">
          Our Blogs
        </h2>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0">
        {blog?.map((blog, index) => {
          return <BlogCard blog={blog} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Blog;
