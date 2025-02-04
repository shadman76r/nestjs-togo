"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateBidProperty() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    basePrice: "",
    location: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3001/property/add",
        {
          ...form,
          basePrice: parseFloat(form.basePrice),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      router.push("/bid");
    } catch (err) {
      setError("Failed to create property. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-black">Create Bidding Property</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            required
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-300 text-black focus:ring-2 focus:ring-green-500"
          />
          <textarea
            name="description"
            placeholder="Property Description"
            required
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-300 text-black focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            name="basePrice"
            placeholder="Base Price"
            required
            value={form.basePrice}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-300 text-black focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            value={form.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-300 text-black focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            Create Property
          </button>
        </form>
      </div>
    </div>
  );
}
