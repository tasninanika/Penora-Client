import axios from "axios";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import userLogo from "../assets/user.jpg";

const PopularAuthors = () => {
  const [popularUser, setPopularUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersRes = await axios.get(
          `https://penora-server.onrender.com/api/v1/user/all-users`
        );

        // Fetch all published blogs
        const blogsRes = await axios.get(
          `https://penora-server.onrender.com/api/v1/blog/get-published-blogs`,
          { withCredentials: true }
        );

        if (usersRes.data.success && blogsRes.data.success) {
          const allUsers = usersRes.data.users;
          const allBlogs = blogsRes.data.blogs;

          const usersWithStats = allUsers.map((user) => {
            const userBlogs = allBlogs.filter(
              (blog) => blog.author._id === user._id
            );

            const blogCount = userBlogs.length;

            const totalLikes = userBlogs.reduce(
              (acc, blog) => acc + (blog.likes?.length || 0),
              0
            );

            return { ...user, blogCount, totalLikes };
          });

          const popularUsers = usersWithStats.filter(
            (user) => user.blogCount > 0
          );

          setPopularUser(popularUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="w-11/12 mx-auto my-16">
      <h2 className="text-3xl font-bold mb-10 text-center" data-aos="fade-up">
        Top Authors of the Week
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {popularUser?.slice(0, 3)?.map((user, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl text-center hover:shadow-xl transition duration-300"
            data-aos="zoom-in"
            data-aos-delay={idx * 150}
          >
            <img
              src={user.photoUrl || userLogo}
              alt={`${user?.firstName} ${user?.lastName}`}
              className="w-24 h-24 rounded-full mx-auto border-4 border-[#1b9c85] mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-gray-600 text-sm">{user?.bio}</p>
            <div className="flex justify-center gap-6 text-gray-700 text-sm mt-3">
              <span>📝 {user.blogCount} Blogs</span>
              <span>❤️ {user.totalLikes} Likes</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularAuthors;
