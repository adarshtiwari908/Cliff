import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);

      // ✅ Extract token and user properly from backend response
      const { token, user } = res.data.data;

      // ✅ Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Show backend message
      setMessage(res.data.message);

      // ✅ Redirect to profile page
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Left Section - Dark Cliff Branding */}
      <div className="w-1/2 bg-black flex flex-col justify-center items-center p-10 relative">
        {/* Centered Text + Logo */}
        <div className="text-white text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-black font-bold text-lg">c</span>
            </div>
            <span className="text-2xl font-semibold">cliff</span>
          </div>

          <h1 className="text-4xl font-light mb-4 leading-tight">
            Start building with <br />
            your free plan
          </h1>
          <p className="text-gray-400 text-lg">No credit card required.</p>
        </div>

        {/* Footer */}
        <div className="absolute bottom-10 text-gray-500 text-sm">
          © 2025 Cliff, Inc. All Rights Reserved.
        </div>
      </div>

      {/* Right Section - Gradient Background with Login Card */}
      <div className="w-1/2 bg-gradient-to-br from-purple-600 via-blue-500 to-orange-300 flex items-center justify-center">
        <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
            Sign in
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
            </div>

            {/* Terms */}
            <div className="text-xs text-gray-600">
              By continuing, you agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continue
            </button>

            {/* Message Display */}
            {message && (
              <div
                className={`mt-4 p-2.5 rounded-lg text-sm ${
                  message.includes("success")
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;