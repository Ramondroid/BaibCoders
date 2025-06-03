'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navLinks: { href: string; label: string }[] = [
  { href: '/signup', label: 'Sign Up' },
  { href: '/login', label: 'Login' },
];

const NoAuthNavbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full px-6 py-4 bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="" className="text-2xl font-bold">Uina</Link>
        <div className="space-x-6">
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

export default NoAuthNavbar;