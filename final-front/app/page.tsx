"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900">
      <motion.h1
        className="text-6xl font-extrabold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Welcome to{" "}
        <span className="bg-gradient-to-r from-blue-500 to-teal-600 bg-clip-text text-transparent">
          TO-GO
        </span>
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Rent, Buy, Sell & Bid on Properties Seamlessly with TO-GO.
      </motion.p>

      <motion.div
        className="flex gap-4 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {!isLoggedIn ? (
          <>
            <Link href="/auth/login">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-gray-50 transition-transform transform hover:scale-105 border border-gray-200">
                Login
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-8 py-4 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        )}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-4/5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Link href="/buy">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white text-gray-900 shadow-lg rounded-2xl cursor-pointer transition-transform transform hover:shadow-2xl border border-gray-200"
          >
            <h2 className="text-3xl font-semibold mb-4">🏡 Buy Property</h2>
            <p className="text-gray-600">
              Find your dream home with ease and elegance.
            </p>
          </motion.div>
        </Link>

        <Link href="./properties/sell">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white text-gray-900 shadow-lg rounded-2xl cursor-pointer transition-transform transform hover:shadow-2xl border border-gray-200"
          >
            <h2 className="text-3xl font-semibold mb-4">🏠 Sell Property</h2>
            <p className="text-gray-600">
              List your property and reach potential buyers effortlessly.
            </p>
          </motion.div>
        </Link>

        <Link href="/bid">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white text-gray-900 shadow-lg rounded-2xl cursor-pointer transition-transform transform hover:shadow-2xl border border-gray-200"
          >
            <h2 className="text-3xl font-semibold mb-4">💰 Bid Property</h2>
            <p className="text-gray-600">
              Participate in auctions and place bids competitively.
            </p>
          </motion.div>
        </Link>
      </motion.div>

      <motion.div
        className="absolute bottom-8 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        © 2025 TO-GO. All rights reserved.
      </motion.div>
    </div>
  );
}
