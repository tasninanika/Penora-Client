import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import CommentBox from "@/components/CommentBox";
import axios from "axios";
import { setBlog } from "@/redux/blogSlice";
import { toast } from "sonner";

const BlogView = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);
  const { comment } = useSelector((store) => store.comment);

  const selectedBlog = blog.find((b) => b._id === blogId);

  const [blogLike, setBlogLike] = useState(selectedBlog?.likes.length || 0);
  const [liked, setLiked] = useState(
    selectedBlog?.likes.includes(user?._id) || false
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `https://penora-server-1.onrender.com/api/v1/blog/${selectedBlog._id}/${action}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
        setBlogLike(updatedLikes);
        setLiked(!liked);

        const updatedBlogData = blog.map((p) =>
          p._id === selectedBlog._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const changeTimeFormat = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blogs/${blogId}`;
    if (navigator.share) {
      navigator.share({
        title: selectedBlog.title,
        text: "Check out this blog!",
        url: blogUrl,
      });
    } else {
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success("Blog link copied to clipboard!");
      });
    }
  };

  if (!selectedBlog)
    return <p className="text-center mt-20">Blog not found.</p>;

  return (
    <div className="pt-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto p-6 sm:p-10">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8 text-gray-500 dark:text-gray-400 font-grotesk">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">
                <BreadcrumbLink>Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/blogs">
                <BreadcrumbLink>Blogs</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Blog Header */}
        <div className="mb-8">
          <h2 className="text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white font-grotesk">
            {selectedBlog.title}
          </h2>
          <div className="flex items-center justify-between flex-wrap gap-4 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={selectedBlog.author.photoUrl} />
                <AvatarFallback>
                  {selectedBlog.author.firstName[0]}
                  {selectedBlog.author.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium font-alegreya">
                  {selectedBlog.author.firstName} {selectedBlog.author.lastName}
                </p>
              </div>
            </div>
            <p className="text-sm font-alegreya">
              Published on {changeTimeFormat(selectedBlog.createdAt)} • 8 min
              read
            </p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-10 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <img
            src={selectedBlog.thumbnail}
            alt={selectedBlog.title}
            className="w-full object-cover"
          />
          {selectedBlog.subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic px-2 font-alegreya">
              {selectedBlog.subtitle}
            </p>
          )}
        </div>

        {/* Blog Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Blogging", "Productivity", "TechTrends"].map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-3 py-1 bg-[#e9f9ec] text-[#1b9c85] rounded-full text-xs cursor-pointer hover:bg-[#1b9c85] hover:text-white transition"
            >
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Engagement */}
        <div className="flex flex-wrap items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              onClick={likeOrDislikeHandler}
              variant="ghost"
              className="flex items-center gap-2"
            >
              {liked ? (
                <FaHeart className="text-red-600" />
              ) : (
                <FaRegHeart className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
              )}
              <span>{blogLike}</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span>{comment.length} Comments</span>
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost">
              <Bookmark className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => handleShare(selectedBlog._id)}
              variant="ghost"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Comments */}
        <CommentBox selectedBlog={selectedBlog} />
      </div>
    </div>
  );
};

export default BlogView;
