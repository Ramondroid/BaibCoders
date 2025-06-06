// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import NavbarWrapper from "@/components/nav/NavbarWrapper"; // Capitalized import

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
  const supabase = await createClient();

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
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
