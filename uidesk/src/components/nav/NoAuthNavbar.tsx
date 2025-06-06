'use client';

import React from 'react';
import Link from 'next/link';


const NoAuthNavbar: React.FC = () => {


  return (
    <nav className="w-full bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white shadow-lg sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-purple-400 hover:text-purple-300 transition"
        >
          Ui<span className="text-white">na</span>
        </Link>

     </div>
    </nav>
  );
};

export default NoAuthNavbar;
