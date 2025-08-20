import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import auth from "../assets/signin.json";
import Lottie from "lottie-react";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://penora-server.onrender.com/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen md:h-[760px] gap-6 md:pt-10 px-4">
      {/* Lottie Animation */}
      <div className="hidden md:flex justify-center items-center w-1/2">
        <Lottie animationData={auth} className="h-[500px]" />
      </div>

      {/* Signup Card */}
      <div className="flex justify-center items-center flex-1">
        <Card className="w-full max-w-md p-6 rounded-2xl  dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold font-grotesk">
              Create an account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 font-alegreya" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    className="dark:border-gray-600 dark:bg-gray-900 mt-2"
                  />
                </div>

                <div className="flex-1">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    className="dark:border-gray-600 dark:bg-gray-900 mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900 mt-2"
                />
              </div>

              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900 mt-2"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full btn btn-outline border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white dark:hover:text-black"
              >
                Sign Up
              </Button>

              <p className="text-center text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link to={"/login"}>
                  <span className="cursor-pointer dark:hover:text-gray-100 text-green-600 font-medium hover:underline">
                    Sign in
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
