'use client'

import { login } from "@/actions/login";
export function LoginForm() {
  return (
    <div className="min-h-[calc(100vh-4.25rem)] flex items-center justify-center px-4">
      <form
        
        className="bg-white/10 backdrop-blur-lg border border-white/10 text-white p-8 rounded-2xl shadow-2xl w-[1200px] h-[380px] max-w-md"
      >
        <h2 className="text-5xl font-bold mb-6 text-center text-pwhite-400">
          Sign In
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-4"

        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-4"

        />

        <button
          type="submit"
          formAction={login}
          className="w-full h-[60px] bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md mt-6 font-semibold transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
