"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <Link href="/" className="text-lg font-bold">Home</Link>
      <Link href="/auth/login" className="bg-white text-blue-600 px-4 py-2 rounded">Login</Link>
    </nav>
  );
}
