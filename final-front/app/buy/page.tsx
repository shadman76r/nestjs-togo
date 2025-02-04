"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number | null;
  location: string;
  isSold: boolean;
  buyer?: string;
  createdAt: string;
}

export default function BuyPropertyPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activePurchase, setActivePurchase] = useState<number | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/buy-property/public");
        console.log("Fetched Properties:", data); // Debugging

        setProperties(
          data.map((prop: Property) => ({
            ...prop,
            price: prop.price !== null ? parseFloat(prop.price.toString()) : null,
          }))
        );
      } catch (err) {
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handlePurchase = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/auth/login?redirect=${encodeURIComponent(router.asPath)}`);
      return;
    }

    try {
      setActivePurchase(id);
      setError("");

      const { data } = await axios.patch(
        `http://localhost:3001/buy-property/purchase/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProperties((prev) =>
        prev.map((prop) =>
          prop.id === id ? { ...prop, isSold: true, buyer: data.buyer } : prop
        )
      );
    } catch (err: any) {
      handlePurchaseError(err);
    } finally {
      setActivePurchase(null);
    }
  };

  const handlePurchaseError = (error: any) => {
    let message = "Purchase failed. Please try again.";
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = "Session expired. Redirecting to login...";
          localStorage.removeItem("token");
          setTimeout(() => router.push("/auth/login"), 2000);
          break;
        case 400:
          message = error.response.data.message || "Property no longer available";
          break;
        case 404:
          message = "Property not found";
          break;
      }
    } else if (error.request) {
      message = "Network error. Check your internet connection.";
    }
    setError(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Available Properties
        </h1>

        {error && (
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="bg-red-50 text-red-700 p-4 rounded-lg mb-8 text-center"
          >
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))
          ) : (
            properties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{property.title}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      property.isSold
                        ? "bg-rose-100 text-rose-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {property.isSold ? "Sold" : "Available"}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{property.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-blue-600">
                    {property.price !== null
                      ? `$${property.price.toLocaleString()}`
                      : "Price not available"}
                  </span>
                  <span className="text-sm text-gray-500">{property.location || "No location"}</span>
                </div>

                <button
                  onClick={() => handlePurchase(property.id)}
                  disabled={property.isSold || !!activePurchase}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    property.isSold
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : activePurchase === property.id
                      ? "bg-blue-400 text-white cursor-wait"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {activePurchase === property.id ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        {/* Spinner SVG */}
                      </svg>
                      Purchasing...
                    </span>
                  ) : property.isSold ? (
                    property.buyer ? `Sold to ${property.buyer}` : "Sold"
                  ) : (
                    "Purchase Now"
                  )}
                </button>
              </motion.div>
            ))
          )}
        </div>

        {!loading && properties.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No properties currently available
          </div>
        )}
      </motion.div>
    </div>
  );
}
