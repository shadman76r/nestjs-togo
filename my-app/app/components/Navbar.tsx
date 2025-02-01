"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          To-go
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/rent" className="hover:text-primary">Rent</Link>
          <Link href="/buy" className="hover:text-primary">Buy</Link>
          <Link href="/bid" className="hover:text-primary">Bid</Link>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white py-4 space-y-2">
          <Link href="/rent" className="block text-center">Rent</Link>
          <Link href="/buy" className="block text-center">Buy</Link>
          <Link href="/bid" className="block text-center">Bid</Link>
        </div>
      )}
    </nav>
  );
}
