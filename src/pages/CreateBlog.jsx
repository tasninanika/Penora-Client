import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setBlog } from "@/redux/blogSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const { blog } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSelectedCategory = (value) => setCategory(value);

  const createBlogHandler = async () => {
    if (!title || !category) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:3000/api/v1/blog/`,
        { title, category },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setBlog(blog ? [...blog, res.data.blog] : [res.data.blog]));
        navigate(`/dashboard/write-blog/${res.data.blog._id}`);
        toast.success(res.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:pr-20 h-screen md:pl-[320px] pt-40 bg-gray-50 dark:bg-gray-900 font-grotesk">
      <Card className="max-w-3xl mx-auto p-8 space-y-6 shadow-lg dark:bg-gray-800 rounded-xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 text-center font-grotesk">
            Create a New Blog
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Share your thoughts, tutorials, or stories by creating a new blog.
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">Title</Label>
            <Input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-full md:w-72 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-gray-500 focus:border-gray-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Digital Marketing">
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button
              className="flex items-center gap-2 rounded-full btn btn-outline border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white px-6 py-2  hover:opacity-90 transition dark:hover:text-black"
              disabled={loading}
              onClick={createBlogHandler}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create Blog"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateBlog;
