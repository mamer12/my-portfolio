"use client";
import "./globals.css";
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import { useState, useEffect } from 'react';
import Lenis from 'lenis';
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

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="en">
      <body className="dark relative bg-[#0a0a0a] text-white font-sans">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen w-screen">
            <Loader />
          </div>
        ) : (
          <>
            <div className="pointer-events-none fixed inset-0 -z-10 opacity-80 bg-aurora" />
            <DotPattern

              className={cn(
                "fixed inset-0 z-0",
                "[mask-image:radial-gradient(1000px_circle_at_center,rgba(255,255,255,0.3),transparent)]"
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