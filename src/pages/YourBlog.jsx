import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBlog } from "@/redux/blogSlice";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const YourBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  const getOwnBlog = async () => {
    try {
      const res = await axios.get(
        `https://penora-server.onrender.com/api/v1/blog/get-own-blogs`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch blogs");
    }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `https://penora-server.onrender.com/api/v1/blog/delete/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getOwnBlog();
  }, []);

  const formatDate = (index) => {
    const date = new Date(blog[index].createdAt);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-5 space-y-4 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
            Your Blogs
          </h1>

          {blog?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">
              No blogs found. Start creating your first blog!
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TableCaption className="text-gray-500 dark:text-gray-400">
                  A list of your recent blogs.
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blog?.map((item, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <TableCell className="flex gap-4 items-center py-3">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-16 h-16 rounded-lg shadow-sm hidden md:block object-cover"
                        />
                        <h2
                          className="hover:underline font-semibold text-gray-800 dark:text-gray-100 cursor-pointer font-grotesk"
                          onClick={() => navigate(`/blogs/${item._id}`)}
                        >
                          {item.title}
                        </h2>
                      </TableCell>
                      <TableCell>
                        <span className="py-1 dark:bg-gray-700 text-sm rounded-lg">
                          {item.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className=" py-1  dark:bg-gray-700 text-sm rounded-lg">
                          {formatDate(index)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <BsThreeDotsVertical className="cursor-pointer text-gray-600 dark:text-gray-300" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-1">
                            <DropdownMenuItem
                              className="font-grotesk"
                              onClick={() =>
                                navigate(`/dashboard/write-blog/${item._id}`)
                              }
                            >
                              <Edit className="mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500 font-grotesk"
                              onClick={() => deleteBlog(item._id)}
                            >
                              <Trash2 className="mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default YourBlog;
