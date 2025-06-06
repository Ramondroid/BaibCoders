import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server"; // ✅ use SSR-aware client
import AuthNavbar from "@/components/nav/AuthNavbar";
import NoAuthNavbar from "@/components/nav/NoAuthNavbar";

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
  const supabase = createClient(); // ✅ use server-aware Supabase client

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {user ? <AuthNavbar /> : <NoAuthNavbar />}
        {children}
      </body>
    </html>
  );
}
