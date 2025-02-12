"use client";

import "./globals.css";
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar'
import Loader from '@/components/loader'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className="font-mono dark relative">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen w-screen">
            <Loader />
          </div>
        ) : (
          <>
            <DotPattern
              width={100}
              className={cn(
                "fixed inset-0 z-0",
                "[mask-image:radial-gradient(1000px_circle_at_center,green,transparent)]"
              )}
            />
            <Navbar />
            <main className="relative z-10">
              {children}
            </main>
          </>
        )}
      </body>
    </html>
  )
}