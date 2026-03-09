'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Disable browser's native scroll restoration so it doesn't override our behavior
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

export function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
