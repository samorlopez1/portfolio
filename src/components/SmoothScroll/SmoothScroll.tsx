'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (window.innerWidth <= 500) return;
        if (pathname !== '/') return;

        const lenis = new Lenis({
            duration: .4,
            easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [pathname]);

    return <>{children}</>;
}
