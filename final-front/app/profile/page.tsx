"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  isSold: boolean;
  isApproved: boolean;
}

export default function UserProfile() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editProperty, setEditProperty] = useState<Property | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchProperties = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/sell-property/public", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperties(data);
      } catch (err) {
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [router]);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:3001/sell-property/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(properties.filter((prop) => prop.id !== id));
    } catch {
      setError("Failed to delete property.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProperty) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.patch(`http://localhost:3001/sell-property/${editProperty.id}`, editProperty, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(
        properties.map((prop) => (prop.id === editProperty.id ? editProperty : prop))
      );
      setEditProperty(null);
    } catch {
      setError("Failed to update property.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">Your Properties</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">{property.description}</p>
              <p className="text-gray-700">Price: ${property.price}</p>
              <p className="text-gray-500">Location: {property.location}</p>
              <p className={`text-sm font-medium ${property.isSold ? "text-red-500" : "text-green-500"}`}>
                {property.isSold ? "Sold" : "Available"}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setEditProperty(property)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No properties listed.</p>
      )}

      {editProperty && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Property</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                value={editProperty.title}
                onChange={(e) => setEditProperty({ ...editProperty, title: e.target.value })}
                className="w-full p-2 border rounded-md text-black"
                required
              />
              <input
                type="text"
                value={editProperty.location}
                onChange={(e) => setEditProperty({ ...editProperty, location: e.target.value })}
                className="w-full p-2 border rounded-md text-black"
                required
              />
              <input
                type="number"
                value={editProperty.price}
                onChange={(e) => setEditProperty({ ...editProperty, price: Number(e.target.value) })}
                className="w-full p-2 border rounded-md text-black"
                required
              />
              <textarea
                value={editProperty.description}
                onChange={(e) => setEditProperty({ ...editProperty, description: e.target.value })}
                className="w-full p-2 border rounded-md text-black"
                required
              ></textarea>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Save
                </button>
                <button onClick={() => setEditProperty(null)} className="px-4 py-2 bg-gray-400 text-white rounded-md">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
