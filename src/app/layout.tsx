import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My personal portfolio website",
};

import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import Navbar from '@/components/navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-mono dark">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}