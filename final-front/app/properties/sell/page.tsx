"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SellProperty() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      // Redirect to login with the current URL as a query parameter
      router.push(`/auth/login?redirect=${encodeURIComponent("/sell-property")}`);
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setMessage("You must be logged in to sell a property.");
      router.push(`/auth/login?redirect=${encodeURIComponent("/sell-property")}`);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3001/sell-property",
        { title, location, price, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Property listed successfully!");
      setTimeout(() => {
        router.push("/"); // Redirect to home after 2 seconds
      }, 2000);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setMessage("Session expired. Please log in again.");
        localStorage.removeItem("token");
        router.push(`/auth/login?redirect=${encodeURIComponent("/sell-property")}`);
      } else {
        setMessage(error.response?.data?.message || "Failed to list property.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Sell Your Property
        </h2>
        {message && (
          <p
            className={`text-center mt-2 ${
              message.includes("successfully") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Property Title"
            className="w-full p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Listing...
              </div>
            ) : (
              "List Property"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}