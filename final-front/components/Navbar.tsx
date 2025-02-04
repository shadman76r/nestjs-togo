"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage.getItem("token")) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/"); // Redirect to home after logout
    };

    return (
        <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
            {/* Logo/Home Link */}
            <Link href="/" className="text-2xl font-bold">
                TO-GO
            </Link>

            {/* Navigation Links */}
            <div className="flex gap-6">
                <Link href="/buy" className="hover:underline">
                    Buy Property
                </Link>
                <Link href="/sell" className="hover:underline">
                    Sell Property
                </Link>
                <Link href="/bid" className="hover:underline">
                    Bid Property
                </Link>
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="text-red-300 hover:underline"
                    >
                        Logout
                    </button>
                ) : (
                    <Link href="/auth/login" className="hover:underline">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
