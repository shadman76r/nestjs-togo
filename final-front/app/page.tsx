"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">TO-GO</h1>
        <div className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link href="/auth/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">Login</Link>
          <Link href="/auth/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="w-full text-center py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <h2 className="text-4xl font-extrabold">Find Your Dream Property</h2>
        <p className="text-lg mt-2">Buy, Sell, or Rent the best properties at the best prices.</p>
        <div className="mt-6 space-x-4">
          <Link href="/properties/rent" className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition">Rent a Home</Link>
          <Link href="/properties/sell" className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition">Sell Your Property</Link>
        </div>
      </header>

      {/* Featured Listings */}
      <section className="w-full max-w-6xl px-6 py-12">
        <h3 className="text-3xl font-bold text-center text-gray-800">Featured Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image src="/house1.jpg" alt="Property 1" width={400} height={300} className="w-full h-60 object-cover"/>
            <div className="p-4">
              <h4 className="text-xl font-semibold">Luxury Apartment</h4>
              <p className="text-gray-600">$1,500 / month</p>
              <Link href="/properties/1" className="text-blue-600 hover:underline mt-2 inline-block">View Details →</Link>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image src="/house2.jpg" alt="Property 2" width={400} height={300} className="w-full h-60 object-cover"/>
            <div className="p-4">
              <h4 className="text-xl font-semibold">Modern Family Home</h4>
              <p className="text-gray-600">$350,000</p>
              <Link href="/properties/2" className="text-blue-600 hover:underline mt-2 inline-block">View Details →</Link>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image src="/house3.jpg" alt="Property 3" width={400} height={300} className="w-full h-60 object-cover"/>
            <div className="p-4">
              <h4 className="text-xl font-semibold">Cozy Condo</h4>
              <p className="text-gray-600">$1,200 / month</p>
              <Link href="/properties/3" className="text-blue-600 hover:underline mt-2 inline-block">View Details →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full max-w-4xl px-6 py-12 bg-white shadow-md rounded-lg mt-8">
        <h3 className="text-2xl font-bold text-center text-gray-800">Find Properties</h3>
        <form className="flex flex-col md:flex-row gap-4 mt-6">
          <input type="text" placeholder="Enter location" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <select className="w-full p-3 border rounded-lg">
            <option value="">Select Type</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Search</button>
        </form>
      </section>

      {/* Call to Action */}
      <section className="w-full text-center py-16 bg-gray-200 mt-12">
        <h3 className="text-2xl font-bold text-gray-800">List Your Property with Us!</h3>
        <p className="text-gray-600 mt-2">Join thousands of homeowners who have successfully listed their properties.</p>
        <Link href="/auth/signup" className="mt-4 inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-gray-600 bg-gray-900 text-white">
        <p>© 2024 Rent & Sell Hub. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
