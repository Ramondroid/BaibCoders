'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navLinks: { href: string; label: string }[] = [
  { href: '/signup', label: 'Sign Up' }
];

const noAuthNavbar: React.FC = () => {
  const pathname = usePathname();

  return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <nav className="w-full px-6 py-4 bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">Uina</Link>
        <div className="space-x-6">
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    <nav className="overflow-hiddenw-full bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white shadow-lg sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-purple-400 hover:text-purple-300 transition"
        >
          Ui<span className="text-white">na</span>
        </Link>

        <div className="hidden md:flex space-x-6 text-sm sm:text-base">
>>>>>>> Stashed changes
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-gray-400 transition ${ pathname === href ? 'text-purple-400 font-semibold' : ''}`}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default noAuthNavbar;