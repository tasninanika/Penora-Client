import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Comments = () => {
  const [allComments, setAllComments] = useState([]);
  const navigate = useNavigate();

  const getTotalComments = async () => {
    try {
      const res = await axios.get(
        `https://penora-server.onrender.com/api/v1/comment/my-blogs/comments`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setAllComments(res.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalComments();
  }, []);

  return (
    <div className="pb-10 md:pr-20 pt-20 md:pl-[320px] min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors font-grotesk">
      <div className="max-w-6xl mx-auto mt-8 font-grotesk">
        <Card className="w-full p-5 space-y-4 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
            Your Blog Comments
          </h1>

          {allComments?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">
              No comments found yet.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TableCaption className="text-gray-500 dark:text-gray-400">
                  A list of comments on your blogs.
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead>Blog Title</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allComments?.map((comment, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <TableCell className="flex gap-3 items-center py-3">
                        <span className="font-medium text-gray-800 dark:text-gray-100">
                          {comment.postId.title}
                        </span>
                      </TableCell>
                      <TableCell className=" dark:text-gray-200">
                        {comment.content}
                      </TableCell>
                      <TableCell className=" dark:text-gray-200">
                        {comment.userId.firstName}
                      </TableCell>
                      <TableCell className="flex items-center justify-center">
                        <Eye
                          className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
                          onClick={() =>
                            navigate(`/blogs/${comment.postId._id}`)
                          }
                        />
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

export default Comments;
