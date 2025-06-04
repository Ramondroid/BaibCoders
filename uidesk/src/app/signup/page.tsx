'use client';
import { useRouter } from "next/navigation";
import React, { useState } from 'react';

export default function SignUpPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.redirected) {
      window.location.href = res.url;
    } else {
      const { error } = await res.json();
      setError(error || 'Signup failed.');
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1f24] to-[#2a2b31] px-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-lg border border-white/10 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Create Your Account</h2>

      {error && <p className="text-red-400 text-sm mb-2 text-center">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-3"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-3"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-3"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md mt-6 font-semibold transition"
      >
        Create Account
      </button>
    </form>
  </div>
);

}
