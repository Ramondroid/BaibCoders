// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
<<<<<<< Updated upstream
import AuthNavbar from "@/components/nav/AuthNavbar";
import NoAuthNavbar from "@/components/nav/NoAuthNavbar";
import AdminAuthNavbar from "@/components/nav/AdminNavbar";
=======
import NavbarWrapper from "@/components/nav/NavbarWrapper"; // Capitalized import
>>>>>>> Stashed changes

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uina",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
<<<<<<< Updated upstream
  const supabase = createClient();
=======
  const supabase = await createClient();
>>>>>>> Stashed changes

  const {
    data: { user },
  } = await supabase.auth.getUser(); // Only 1 await here

  let role = null;

  if (user) {
    const { data: userData, error } = await (await supabase)
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!error && userData) {
      role = userData.role;
    }
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
<<<<<<< Updated upstream
        {!user && <NoAuthNavbar />}
        {user && role === "Teacher" && <AdminAuthNavbar />}
        {user && role !== "Teacher" && <AuthNavbar />}
=======
        <NavbarWrapper />
>>>>>>> Stashed changes
        {children}
      </body>
    </html>
  );
}
