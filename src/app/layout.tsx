import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./AuthContext"; // Import the provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "All American Muscle | Project Tracker",
  description: "Live progress tracking for classic American muscle car restorations. See your dream car come to life, step by step.",
  keywords: ["classic car restoration", "muscle car", "auto restoration", "project tracking", "All American Muscle"],
  authors: [{ name: "All American Muscle" }],
  openGraph: {
    title: "All American Muscle | Project Tracker",
    description: "Live progress tracking for classic American muscle car restorations.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "All American Muscle",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "All American Muscle | Project Tracker",
    description: "Live progress tracking for classic American muscle car restorations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Wrap the entire app in the AuthProvider */}
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}