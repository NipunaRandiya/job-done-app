import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Simple reusable input component
const InputField = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 shadow-sm"
  />
);

// Custom notification handler
const showNotification = (message) => {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50";
  modal.innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
      <h3 class="text-xl font-bold text-gray-900 mb-4">Notification</h3>
      <p class="text-gray-700 mb-6">${message}</p>
      <button id="close-modal" class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150">
        Close
      </button>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => {
    const closeModal = document.getElementById("close-modal");
    if (closeModal) {
      closeModal.onclick = () => document.body.removeChild(modal);
    }
  }, 0);
};

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("workers"); // default role
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Dynamically change endpoint based on selected role
      const response = await axios.post(`${apiBaseUrl}/${role}/login`, {
        username,
        password,
      });

      console.log('API response:', response.data);
      localStorage.setItem('token', response.data.token);

      // Navigate based on role
      if (role === "workers") navigate("/worker/dashboard");
      else navigate("/customer/dashboard");

    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      showNotification(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 md:p-10 shadow-2xl rounded-3xl border border-gray-200 transform transition-all duration-300 hover:shadow-3xl min-h-[500px] flex flex-col justify-center">
        
        {/* Header Section */}
        <div className="mb-8">
          <p className="text-2xl font-extrabold text-blue-700 tracking-widest mb-1 justify-center flex">
            Job Done
          </p>
          <h1 className="text-l md:text-xl font-black text-gray-900">Welcome back</h1>
        </div>

        {/* Role Selector */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setRole("workers")}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              role === "workers"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Worker
          </button>
          <button
            type="button"
            onClick={() => setRole("users")}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              role === "users"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Client
          </button>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-6">
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded-md focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-gray-600 select-none">
                Remember for 30 days
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-xl font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:scale-[1.01] active:scale-100"
          >
            Sign In
          </button>
        </form>

        {/* Footer Sign Up Link */}
        <div className="mt-8 text-center text-base">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
