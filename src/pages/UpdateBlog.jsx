import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setBlog } from "@/redux/blogSlice";

const UpdateBlog = () => {
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.blogId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);
  const selectBlog = blog.find((blog) => blog._id === id);
  const [content, setContent] = useState(selectBlog.description);

  const [blogData, setBlogData] = useState({
    title: selectBlog?.title,
    subtitle: selectBlog?.subtitle,
    description: content,
    category: selectBlog?.category,
  });

  const [previewThumbnail, setPreviewThumbnail] = useState(
    selectBlog?.thumbnail
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const selectCategory = (value) => {
    setBlogData({ ...blogData, category: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData({ ...blogData, thumbnail: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateBlogHandler = async () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", content);
    formData.append("category", blogData.category);
    formData.append("file", blogData.thumbnail);

    try {
      setLoading(true);
      const res = await axios.put(
        `https://penora-server.onrender.com/api/v1/blog/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  const togglePublishUnpublish = async (action) => {
    try {
      const res = await axios.patch(
        `https://penora-server.onrender.com/api/v1/blog/${id}`,
        {
          params: { action },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/dashboard/your-blog`);
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async () => {
    try {
      const res = await axios.delete(
        `https://penora-server.onrender.com/api/v1/blog/delete/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedBlogData = blog.filter((b) => b?._id !== id);
        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
        navigate("/dashboard/your-blog");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="pb-10 px-3 pt-20 md:pr-20 md:pl-[320px] bg-gray-50 dark:bg-gray-900 min-h-screen font-grotesk">
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 font-grotesk text-center">
              Update Blog
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center text-sm pt-2">
              Make changes to your blog and click save or publish.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              className="rounded-full btn btn-outline border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white px-6 py-2 hover:opacity-90 transition dark:hover:text-black"
              onClick={() =>
                togglePublishUnpublish(
                  selectBlog.isPublished ? "false" : "true"
                )
              }
            >
              {selectBlog?.isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button
              variant="destructive"
              className="rounded-full btn btn-outline border-[0.5px] border-red-600 bg-[#f2d9d9] shadow-none text-black hover:text-white px-6 py-2  hover:opacity-90 transition"
              onClick={deleteBlog}
            >
              Delete Blog
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="dark:border-gray-400 focus:ring-2 focus:ring-green-400 mt-2"
              />
            </div>

            <div>
              <Label>Subtitle</Label>
              <Input
                type="text"
                name="subtitle"
                value={blogData.subtitle}
                onChange={handleChange}
                placeholder="Enter subtitle"
                className="dark:border-gray-400 focus:ring-2 focus:ring-green-400 mt-2"
              />
            </div>

            <div>
              <Label>Description</Label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={setContent}
                config={{ height: 400 }}
                className="rounded-lg border dark:border-gray-400 mt-2 dark:text-black"
              />
            </div>

            <div>
              <Label>Category</Label>
              <Select
                onValueChange={selectCategory}
                className="dark:border-gray-400 focus:ring-2 focus:ring-green-400"
              >
                <SelectTrigger className="w-full md:w-64 mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
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

            <div>
              <Label>Thumbnail</Label>
              <Input
                type="file"
                onChange={selectThumbnail}
                accept="image/*"
                className="w-fit dark:border-gray-400 mt-2"
              />
              {previewThumbnail && (
                <img
                  src={previewThumbnail}
                  alt="Thumbnail Preview"
                  className="w-64 h-40 object-cover rounded-lg mt-2"
                />
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="rounded-full btn btn-outline border-[0.5px] border-black shadow-none text-black hover:text-black dark:text-white px-6 py-2  hover:opacity-90 transition"
            >
              Back
            </Button>
            <Button
              onClick={updateBlogHandler}
              className="rounded-full btn btn-outline border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white dark:hover:text-black px-6 py-2  hover:opacity-90 transition"
            >
              {loading ? "Please Wait..." : "Save"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
