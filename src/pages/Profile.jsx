import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { setUser } from "@/redux/authSlice";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import userLogo from "../assets/user.jpg";
import TotalProperty from "@/components/TotalProperty";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: user?.bio || "",
    facebook: user?.facebook || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
    instagram: user?.instagram || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("bio", input.bio);
    formData.append("facebook", input.facebook);
    formData.append("linkedin", input.linkedin);
    formData.append("instagram", input.instagram);
    formData.append("github", input.github);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        "https://penora-server.onrender.com/api/v1/user/profile/update",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-40 md:pr-20 md:pl-[320px] min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      <div className="flex flex-col items-center md:w-[320px] mx-auto">
        {/* Avatar */}
        <div className="relative group w-40 h-40 mb-5">
          <Avatar className="w-full h-full border-2 border-green-400 shadow-md rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <AvatarImage src={user?.photoUrl || userLogo} />
          </Avatar>
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500 to-green-600 opacity-5 group-hover:opacity-20 transition-opacity" />
        </div>

        {/* Profile Info */}
        <div className="text-center">
          <h2 className="font-bold text-4xl mb-2 text-gray-800 dark:text-gray-100">
            Hi, {user?.firstName} 👋
          </h2>
          <p className=" text-gray-700 dark:text-gray-300 leading-relaxed font-alegreya">
            {user?.bio || "Write your designation.."}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2 font-alegreya">
            {user?.email}
          </p>
          {/* Social Links */}
          <div className="flex gap-4 mt-5 justify-center">
            {[
              user?.facebook,
              user?.linkedin,
              user?.github,
              user?.instagram,
            ].map((link, idx) => {
              const icons = [FaFacebook, FaLinkedin, FaGithub, FaInstagram];
              const IconComp = icons[idx];
              return (
                <Link key={idx} to={link || "#"} target="_blank">
                  <IconComp className="w-6 h-6 text-gray-500 hover:text-gray-700 dark:hover:text-green-400 transition-colors" />
                </Link>
              );
            })}
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6">
            <Dialog open={open} onOpenChange={setOpen}>
              <Button
                onClick={() => setOpen(true)}
                className="rounded-full btn btn-outline border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white px-6 py-2  hover:opacity-90 transition font-alegreya"
              >
                Edit Profile
              </Button>

              <DialogContent className="md:w-[450px] rounded-2xl font-grotesk">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-semibold">
                    Update Profile
                  </DialogTitle>
                  <DialogDescription className="text-center text-gray-500">
                    Update your profile information
                  </DialogDescription>
                </DialogHeader>

                <form className="grid gap-4 py-4" onSubmit={submitHandler}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        name="firstName"
                        value={input.firstName}
                        onChange={changeEventHandler}
                        placeholder="First Name"
                        className="text-gray-600 mt-2"
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        name="lastName"
                        value={input.lastName}
                        onChange={changeEventHandler}
                        placeholder="Last Name"
                        className="text-gray-600 mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Facebook</Label>
                      <Input
                        name="facebook"
                        value={input.facebook}
                        onChange={changeEventHandler}
                        placeholder="Enter a URL"
                        className="text-gray-600 mt-2"
                      />
                    </div>
                    <div>
                      <Label>Instagram</Label>
                      <Input
                        name="instagram"
                        value={input.instagram}
                        onChange={changeEventHandler}
                        placeholder="Enter a URL"
                        className="text-gray-600 mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>LinkedIn</Label>
                      <Input
                        name="linkedin"
                        value={input.linkedin}
                        onChange={changeEventHandler}
                        placeholder="Enter a URL"
                        className="text-gray-600 mt-2"
                      />
                    </div>
                    <div>
                      <Label>GitHub</Label>
                      <Input
                        name="github"
                        value={input.github}
                        onChange={changeEventHandler}
                        placeholder="Enter a URL"
                        className="text-gray-600 mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      name="bio"
                      value={input.bio}
                      onChange={changeEventHandler}
                      placeholder="Enter a description"
                      className="text-gray-600 mt-2"
                    />
                  </div>

                  <div>
                    <Label>Profile Picture</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={changeFileHandler}
                      className="w-full mt-2"
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-indigo-500rounded-full btn btn-outline border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white w-full flex justify-center items-center gap-2 rounded-lg"
                      disabled={loading}
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      Update
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Total Property */}
        </div>
      </div>
      <div className="mt-10">
        <TotalProperty />
      </div>
    </div>
  );
};

export default Profile;
