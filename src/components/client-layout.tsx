"use client";

import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from '@/components/navbar'
import Loader from '@/components/loader'
import UnifiedBackground from '@/components/unified-background'
import { getAnimationSettings } from '@/lib/performance'

export default function ClientLayout({
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
        const { lerpValue, shouldAnimate } = getAnimationSettings();

        // Disable smooth scroll on mobile for better performance
        if (!shouldAnimate || window.innerWidth < 768) {
            return;
        }

        const lenis = new Lenis({
            lerp: lerpValue,
            smoothWheel: true,
            touchMultiplier: 1.5,
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
        <>
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen w-full">
                    <Loader />
                </div>
            ) : (
                <>
                    <UnifiedBackground />
                    <Navbar />
                    <main className="relative z-10 w-full">
                        {children}
                    </main>
                </>
            )}
        </>
    );
}
