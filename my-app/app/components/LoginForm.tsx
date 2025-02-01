"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Login to To-go</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>

          {/* OR Separator */}
          <div className="text-center text-gray-500 my-4">OR</div>

          {/* Social Logins */}
          <div className="flex flex-col space-y-3">
            <button className="flex items-center justify-center border py-2 rounded-lg hover:bg-gray-200">
              <img src="/images/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
            <button className="flex items-center justify-center border py-2 rounded-lg hover:bg-gray-200">
              <img src="/images/facebook-icon.png" alt="Facebook" className="w-5 h-5 mr-2" />
              Sign in with Facebook
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account? <Link href="/register" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
