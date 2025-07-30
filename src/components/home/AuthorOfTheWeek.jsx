import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import author1 from "../../assets/images/blog.jpg";
import author2 from "../../assets/images/blog.jpg";
import author3 from "../../assets/images/blog.jpg";

const AuthorOfTheWeek = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const authors = [
    {
      name: "Jarin Tasnin Anika",
      bio: "ML researcher & Tech writer",
      blogs: 24,
      likes: 1980,
      image: author1,
    },
    {
      name: "Suprio Das",
      bio: "Data Science enthusiast & Blogger",
      blogs: 30,
      likes: 2450,
      image: author2,
    },
    {
      name: "Farhana Islam",
      bio: "Health & Wellness content creator",
      blogs: 18,
      likes: 1600,
      image: author3,
    },
  ];

  return (
    <section className="w-11/12 mx-auto my-16">
      <h2 className="text-3xl font-bold mb-10 text-center" data-aos="fade-up">
        Top Authors of the Week
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {authors.map((author, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl text-center hover:shadow-xl transition duration-300"
            data-aos="zoom-in"
            data-aos-delay={idx * 150} // staggered delay
          >
            <img
              src={author.image}
              alt={author.name}
              className="w-24 h-24 rounded-full mx-auto border-4 border-[#1b9c85] mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {author.name}
            </h3>
            <p className="text-gray-600 text-sm">{author.bio}</p>
            <div className="flex justify-center gap-6 text-gray-700 text-sm mt-3">
              <span>📝 {author.blogs} Blogs</span>
              <span>❤️ {author.likes} Likes</span>
            </div>
            <button className="mt-4 px-4 py-2 text-sm bg-[#1b9c85] text-white rounded-full hover:bg-[#158b76] transition">
              View Blogs
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AuthorOfTheWeek;
