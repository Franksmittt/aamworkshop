import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/joune-theme.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joune - Vind Jou Mense",
  description: "Die Digital Veld waar Suid-Afrikaners verbind. Ontdek jou gemeenskap, deel jou stories, en bou betekenisvolle verhoudings.",
  keywords: ["social", "dating", "south african", "afrikaans", "community", "veld", "joune"],
  authors: [{ name: "Joune Team" }],
  openGraph: {
    title: "Joune - Vind Jou Mense",
    description: "Die Digital Veld waar Suid-Afrikaners verbind.",
    type: "website",
    locale: "af_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joune - Vind Jou Mense",
    description: "Die Digital Veld waar Suid-Afrikaners verbind.",
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
    <html lang="af">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
