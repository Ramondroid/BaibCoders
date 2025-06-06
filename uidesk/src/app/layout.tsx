import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import AuthNavbar from "@/components/nav/AuthNavbar";
import NoAuthNavbar from "@/components/nav/NoAuthNavbar";
import AdminAuthNavbar from "@/components/nav/AdminNavbar";

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
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

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
        {!user && <NoAuthNavbar />}
        {user && role === "Teacher" && <AdminAuthNavbar />}
        {user && role !== "Teacher" && <AuthNavbar />}
        {children}
      </body>
    </html>
  );
}
