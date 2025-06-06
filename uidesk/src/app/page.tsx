'use client';


import AuthNavbar from "@/components/nav/AuthNavbar";
import NoAuthNavbar from "@/components/nav/NoAuthNavbar";
import { useRouter } from 'next/navigation';
import React from 'react';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-[calc(100vh-4.25rem)] flex items-center justify-center bg-gradient-to-r from-[#1e1f24] via-[#2a2b31] to-[#1a1a2e] text-white px-6">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
        
        {/* Left side (70%) */}
        <section className="md:w-[70%] w-full flex flex-col justify-center items-start space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Uina Portal
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Welcome to Uina — your academic command center. Whether you're managing coursework or accessing your faculty tools, everything starts here.
          </p>
        </section>

        {/* Right side (30%) */}
        <section className="md:w-[30%] w-full flex flex-col items-center justify-center space-y-6">
          <button
            onClick={() => router.push('/login/')}
            className="w-80 py-4 bg-purple-400 text-white font-semibold rounded-xl text-lg hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out shadow-lg"
          >
            Student
          </button>
          <button
            onClick={() => router.push('/login/')}
            className="w-80 py-4 bg-purple-400 text-white font-semibold rounded-xl text-lg hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out shadow-lg"
          >
            Faculty
          </button>
        </section>

      </div>
    </main>
  );
}