'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToHomeSectionFromHashWithRetry } from '@/src/lib/sectionNavigation';

// Disable browser's native scroll restoration so it doesn't override our behavior
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

export function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        if (window.location.hash && scrollToHomeSectionFromHashWithRetry(window.location.hash)) {
            return;
        }

        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
