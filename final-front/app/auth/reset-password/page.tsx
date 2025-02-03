"use client";

import { useState } from "react";
import { resetPassword } from "@/utils/auth";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await resetPassword(email, newPassword);
      setMessage(response.message);
    } catch (err) {
      setError("Failed to reset password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Reset Password</h2>
        {message && <p className="text-green-500 text-sm text-center mt-2">{message}</p>}
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
