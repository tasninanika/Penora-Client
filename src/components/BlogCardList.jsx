import { useNavigate } from "react-router-dom";

const BlogCardList = ({ blog }) => {
  const navigate = useNavigate();
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
  };
  return (
    <div className="border border-green-200 bg-[#f3f8f4] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row md:h-40">
      {/* Image Left */}
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full md:w-1/3 md:h-full object-cover p-5 rounded-lg"
      />

      {/* Text Right */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            {blog.title}
          </h2>
          <p className="text-gray-500 text-xs mb-2">
            By {blog.author?.firstName || "Unknown"} • {formattedDate}
          </p>
          <p className="text-gray-700 text-xs line-clamp-2">
            {stripHtml(blog.description).slice(0, 150)}...
          </p>
        </div>
        <button
          onClick={() => navigate(`/blogs/${blog._id}`)}
          className="text-[#1b9c85] text-sm font-semibold hover:underline self-start"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCardList;
