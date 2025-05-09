import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Loader from "./Loader";
import { userLogin } from "../api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      setLoading(true);
      const data = await userLogin(email, password);
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/admin");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/admin");
  }, [navigate]);

  return loading ? (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Loader />{" "}
    </Box>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-transparent-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h3 className="text-4xl font-bold underline flex items-center justify-center">
          Admin
        </h3>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="mt-2 text-sm text-gray-600">Welcome back!</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={"current-password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-10 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                disabled={loading}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400 cursor-pointer" />
                ) : (
                  <Eye size={18} className="text-gray-400 cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
