"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

interface Property {
  id: number;
  title: string;
  description: string;
  basePrice: number;
  location: string;
  biddingEndsAt: string;
}

interface Bid {
  id: number;
  amount: number;
  bidder: string;
}

export default function BiddingDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [newBid, setNewBid] = useState("");
  const [highestBid, setHighestBid] = useState<Bid | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [placingBid, setPlacingBid] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/property/available`);
        const property = data.find((p: Property) => p.id.toString() === propertyId);
        setProperty(property);
      } catch {
        setError("Failed to load property details.");
      }
    };

    const fetchBids = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/property/bids/${propertyId}`);
        setBids(data);
        if (data.length > 0) {
          setHighestBid(data[0]); // The highest bid is the first one (sorted DESC)
        }
      } catch {
        setError("Failed to load bids.");
      }
    };

    fetchPropertyDetails();
    fetchBids();
    setLoading(false);
  }, [propertyId]);

  const handlePlaceBid = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    if (!newBid || isNaN(Number(newBid)) || Number(newBid) <= 0) {
      setError("Please enter a valid bid amount.");// when my user do not use valid bid ammount
      return;
    }

    if (highestBid && Number(newBid) <= highestBid.amount) {
      setError("Bid amount must be higher than the current highest bid."); // must be the 
      return;
    }

    setPlacingBid(true);
    setError("");

    try {
      await axios.post(
        `http://localhost:3001/property/bid/${propertyId}`,
        { amount: parseFloat(newBid) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newBidObject = { id: bids.length + 1, amount: parseFloat(newBid), bidder: "You" };

      setBids((prevBids) => [newBidObject, ...prevBids]); // Add new bid at the top
      setHighestBid(newBidObject); // Update highest bid immediately
      setNewBid("");
    } catch {
      setError("Failed to place bid. Try again.");
    } finally {
      setPlacingBid(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {error && (
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="bg-red-50 text-red-700 p-4 rounded-lg mb-4 text-center">
          {error}
        </motion.div>
      )}

      {loading ? (
        <p className="text-black text-center w-full">Loading...</p>
      ) : property ? (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black">{property.title}</h2>
          <p className="text-black-600 text-black">{property.description}</p>
          <p className="text-blue-600 font-medium">Starting Price: Taka {property.basePrice.toLocaleString()}</p>
          <p className="text-black-500 text-black">Location: {property.location}</p>
          <p className="text-balck-500 text-black">Bidding Ends: {new Date(property.biddingEndsAt).toLocaleString()}</p>

          <h3 className="text-xl font-semibold mt-4 text-black">Bids:</h3>
          <ul className="space-y-2">
            {bids.length > 0 ? (
              bids.map((bid) => (
                <li key={bid.id} className="p-2 bg-slate-300 rounded-md flex justify-between">
                  <span>{bid.bidder}</span>
                  <span className="text-blue-600 font-medium">Taka {bid.amount.toLocaleString()}</span>
                </li>
              ))
            ) : (
              <p className="text-black">No bids yet.</p>
            )}
          </ul>

          <h3 className="text-lg font-medium mt-4 text-black">Highest Bid:</h3>
          {highestBid ? (
            <p className="text-green-600 font-bold">Taka {highestBid.amount.toLocaleString()} by {highestBid.bidder}</p>
          ) : (
            <p className="text-black">No bids yet.</p>
          )}

          <div className="mt-4">
            <input
              type="number"
              placeholder="Enter bid amount"
              value={newBid}
              onChange={(e) => setNewBid(e.target.value)}
              className="w-full p-3 border rounded-lg mb-2 text-black" // Changed text color to black
            />
            <button
              onClick={handlePlaceBid}
              disabled={placingBid}
              className={`w-full py-2 rounded-lg font-medium transition ${
                placingBid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {placingBid ? "Placing..." : "Place Bid"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center w-full">Property not found.</p>
      )}
    </div>
  );
}
