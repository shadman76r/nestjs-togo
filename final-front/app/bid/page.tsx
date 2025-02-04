"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

interface Property {
  id: number;
  title: string;
  description: string;
  basePrice: number;
  location: string;
  biddingEndsAt: string;
  isAvailableForBidding: boolean;
}

export default function BiddingPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3001/property/available");
        setProperties(response.data);
      } catch (err) {
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-black mb-8 text-center">
          Bid on Properties
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
            <p className="text-gray-500 text-center w-full">Loading properties...</p>
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900">{property.title}</h2>
                <p className="text-gray-600 mb-2">{property.description}</p>
                <p className="text-blue-600 font-medium">
                  Starting Price: ${property.basePrice.toLocaleString()}
                </p>
                <p className="text-gray-500">Location: {property.location}</p>
                <p className="text-gray-500">Bidding Ends: {new Date(property.biddingEndsAt).toLocaleString()}</p>
                <button
                  onClick={() => router.push(`/bid/${property.id}`)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Place a Bid
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">No properties available for bidding.</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/bid/create")}
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
          >
            Create a Bidding Property
          </button>
        </div>
      </motion.div>
    </div>
  );
}
