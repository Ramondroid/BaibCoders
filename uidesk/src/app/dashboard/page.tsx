'use client';

import React from 'react';
import { FaUser, FaChartPie, FaCog } from 'react-icons/fa';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-full p-5">
        <h1 className="text-xl font-bold mb-8">Dashboard</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaChartPie /> Overview
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaUser /> Profile
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaCog /> Grades?
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-6">Welcome back!</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Profile</h3>
            <p className="text-2xl mt-2">jose ezra dale ramon </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Gender</h3>
            <p className="text-2xl mt-2">tite</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Student Status</h3>
            <p className="text-2xl mt-2">bagsak</p>
          </div>
        </div>
      </main>
    </div>
  );
}
