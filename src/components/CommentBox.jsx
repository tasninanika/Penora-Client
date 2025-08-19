import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setBlog } from "@/redux/blogSlice";
import { setComment } from "@/redux/commentSlice";
import { Edit, Trash2 } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

const CommentBox = ({ selectedBlog }) => {
  const { user } = useSelector((store) => store.auth);
  const { comment } = useSelector((store) => store.comment);
  const { blog } = useSelector((store) => store.blog);

  const [content, setContent] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setContent(inputText.trimStart());
  };

  const handleReplyClick = (commentId) => {
    setActiveReplyId(activeReplyId === commentId ? null : commentId);
    setReplyText("");
  };

  useEffect(() => {
    const getAllCommentsOfBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/comment/${selectedBlog._id}/comment/all`
        );
        dispatch(setComment(res.data.comments));
      } catch (error) {
        console.error(error);
      }
    };
    getAllCommentsOfBlog();
  }, [selectedBlog._id, dispatch]);

  // Add new comment
  const commentHandler = async () => {
    if (!content) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/comment/${selectedBlog._id}/create`,
        { content },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        dispatch(setComment(updatedCommentData));

        const updatedBlogData = blog.map((p) =>
          p._id === selectedBlog._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        dispatch(setBlog(updatedBlogData));

        toast.success(res.data.message);
        setContent("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    }
  };

  // Add reply to a comment
  const replyHandler = async (commentId) => {
    if (!replyText) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/comment/${commentId}/reply`,
        { content: replyText },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedCommentData = comment.map((c) =>
          c._id === commentId
            ? { ...c, replies: [...c.replies, res.data.reply] }
            : c
        );
        dispatch(setComment(updatedCommentData));
        setReplyText("");
        setActiveReplyId(null);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to reply");
    }
  };

  // Delete comment
  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/comment/${commentId}/delete`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedCommentData = comment.filter(
          (item) => item._id !== commentId
        );
        dispatch(setComment(updatedCommentData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment");
    }
  };

  // Edit comment
  const editCommentHandler = async (commentId) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/comment/${commentId}/edit`,
        { content: editedContent },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedCommentData = comment.map((item) =>
          item._id === commentId ? { ...item, content: editedContent } : item
        );
        dispatch(setComment(updatedCommentData));
        toast.success(res.data.message);
        setEditingCommentId(null);
        setEditedContent("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit comment");
    }
  };

  // Like comment
  const likeCommentHandler = async (commentId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/comment/${commentId}/like`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedCommentList = comment.map((item) =>
          item._id === commentId ? res.data.updatedComment : item
        );
        dispatch(setComment(updatedCommentList));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      {/* User Input */}
      <div className="flex gap-4 mb-4 items-center">
        <Avatar>
          <AvatarImage src={user.photoUrl} />
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">
          {user.firstName} {user.lastName}
        </h2>
      </div>

      <div className="flex gap-3 mb-6">
        <Textarea
          placeholder="Leave a comment"
          className="bg-gray-100 dark:bg-gray-800"
          onChange={changeEventHandler}
          value={content}
        />
        <Button onClick={commentHandler}>
          <LuSend />
        </Button>
      </div>

      {/* Comments List */}
      {comment.length > 0 && (
        <div className="mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md">
          {comment.map((item) => (
            <div key={item._id} className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-start">
                  <Avatar>
                    <AvatarImage src={item?.userId?.photoUrl} />
                    <AvatarFallback>...</AvatarFallback>
                  </Avatar>
                  <div className="mb-2 space-y-1 md:w-[400px]">
                    <h2 className="font-semibold">
                      {item?.userId?.firstName} {item?.userId?.lastName}{" "}
                      <span className="text-sm ml-2 font-light">
                        {formatDistanceToNow(new Date(item.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </h2>

                    {editingCommentId === item._id ? (
                      <>
                        <Textarea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="mb-2 bg-gray-200 dark:bg-gray-700"
                        />
                        <div className="flex py-1 gap-2">
                          <Button
                            size="sm"
                            onClick={() => editCommentHandler(item._id)}
                            className="bg-[#e9f9ec] text-[#1b9c85] rounded-full text-sm hover:bg-[#1b9c85] hover:text-white transition"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingCommentId(null)}
                            className="rounded-full"
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <p>{item?.content}</p>
                    )}

                    <div className="flex gap-5 items-center">
                      <div
                        className="flex gap-1 items-center cursor-pointer"
                        onClick={() => likeCommentHandler(item._id)}
                      >
                        {item.likes.includes(user._id) ? (
                          <FaHeart fill="red" />
                        ) : (
                          <FaRegHeart />
                        )}
                        <span>{item.numberOfLikes}</span>
                      </div>
                      <p
                        onClick={() => handleReplyClick(item._id)}
                        className="text-sm cursor-pointer"
                      >
                        Reply
                      </p>
                    </div>
                  </div>
                </div>

                {user._id === item?.userId?._id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <BsThreeDots />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingCommentId(item._id);
                          setEditedContent(item.content);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteComment(item._id)}
                        className="text-red-500"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {/* Reply Input */}
              {activeReplyId === item._id && (
                <div className="flex gap-3 mt-2 ml-12">
                  <Textarea
                    placeholder="Write a reply..."
                    className="bg-gray-100 dark:bg-gray-800"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button onClick={() => replyHandler(item._id)}>
                    <LuSend />
                  </Button>
                </div>
              )}

              {/* Replies List */}
              {item.replies && item.replies.length > 0 && (
                <div className="ml-12 mt-2 space-y-2">
                  {item.replies.map((reply) => (
                    <div key={reply._id} className="flex gap-3 items-start">
                      <Avatar>
                        <AvatarImage src={reply.userId.photoUrl} />
                        <AvatarFallback>...</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm">
                          {reply.userId.firstName} {reply.userId.lastName}{" "}
                          <span className="text-xs font-light ml-1">
                            {formatDistanceToNow(new Date(reply.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </h3>
                        <p className="text-sm">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
