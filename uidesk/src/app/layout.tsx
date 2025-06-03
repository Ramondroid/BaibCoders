import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from 'next/headers';
import AuthNavbar from '@/components/AuthNavbar';
import NoAuthNavbar from "@/components/NoAuthNavbar";

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
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token');
  const isLoggedIn = !!authToken;

  return (
    <html lang="en">
      <body>
        {isLoggedIn ? <AuthNavbar /> : <NoAuthNavbar />}
        {children}
      </body>
    </html>
  );
}

