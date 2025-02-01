"use client";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="mt-6 flex">
      <input
        type="text"
        placeholder="Search for a property..."
        className="p-3 rounded-l-lg border border-gray-300 focus:outline-none w-72"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-primary text-white px-4 py-3 rounded-r-lg">Search</button>
    </div>
  );
}
