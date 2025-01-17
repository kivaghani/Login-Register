import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", formData);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-green-600 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left Side - Branding */}
        <div className="md:w-1/2 bg-gradient-to-br from-teal-600 to-green-600 p-12 text-white flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Kartik Vaghani</h1>
          <p className="text-lg md:text-xl">
            Take your business to an advanced level with POS systems.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2">Sign In</h2>
            <p className="text-gray-600 mb-6">Please login to your account.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg transition-colors duration-200"
              >
                Login
              </button>

              <p className="text-center mt-4">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-teal-600 hover:text-teal-700 cursor-pointer font-medium"
                >
                  Sign Up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;