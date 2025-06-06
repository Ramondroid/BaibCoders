"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client"; // adjust path as needed
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";

const navLinks = [
  { href: '/student/dashboard', label: 'Dashboard' },
  { href: '/student/tickets', label: 'Tickets' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' }
];

const AdminAuthNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); 
    router.refresh();
  };

  return (
    <nav className="w-full bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white shadow-lg sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/student/dashboard"
          className="text-3xl font-extrabold tracking-tight text-purple-400 hover:text-purple-300 transition"
        >
          Ui<span className="text-white">na</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-sm sm:text-base items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-purple-300 transition ${
                pathname === href
                  ? "text-purple-400 font-semibold underline underline-offset-4"
                  : ""
              }`}
            >
              {label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="ml-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-[#1e1f24] text-sm">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block py-2 px-3 rounded hover:bg-purple-800 transition ${
                pathname === href
                  ? "bg-purple-700 text-white font-semibold"
                  : "text-gray-300"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}

          <form >
          <button
          formAction={logout}
          type="submit"
            className="block w-full text-left py-2 px-3 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
          >
            Logout
          </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default AdminAuthNavbar;
