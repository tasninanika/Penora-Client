import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import auth from "../assets/signin.json";
import Lottie from "lottie-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/");
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:pt-24 h-screen dark:bg-gray-900 px-4">
      {/* Left Side Animation */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <Lottie animationData={auth} loop={true} className="h-[500px]" />
      </div>

      {/* Right Side Login Card */}
      <div className="flex w-full md:w-1/2 justify-center">
        <Card className="w-full max-w-md p-6 dark:bg-gray-800 dark:border-gray-700 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-semibold font-grotesk">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-5 font-alegreya" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900 mt-2"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900 mt-2"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full rounded-full btn btn-outline border-[0.5px] border-green-600 bg-[#edf6ee] shadow-none text-black hover:text-white dark:hover:text-black"
              >
                Login
              </Button>

              {/* Redirect to Sign Up */}
              <p className="text-center text-gray-600 dark:text-gray-300">
                Don&apos;t have an account?{" "}
                <Link to={"/signup"}>
                  <span className="cursor-pointer text-green-600 font-medium hover:underline">
                    Sign up
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

export default Login;
