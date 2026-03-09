'use client';

import dynamicComponent from 'next/dynamic';

export const dynamic = 'force-dynamic';

const Gallery = dynamicComponent(() => import('@/src/page-components/Gallery/Gallery').then((mod) => ({ default: mod.Gallery })), {
    ssr: false,
});

export default function PlayPage() {
    return <Gallery />;
}
