'use client'

import dynamic from 'next/dynamic'

const HalftoneBackground = dynamic(
    () => import('./HalftoneBackground'),
    { ssr: false }
)

const SVG_URLS = [
    '/halftone/01.svg',
    '/halftone/02.svg',
    '/halftone/03.svg',
    '/halftone/04.svg',
    '/halftone/05.svg',
    '/halftone/06.svg',
]

export function HalftoneBackgroundLoader() {
    return <HalftoneBackground videoSrc="/bg-video.mp4" svgUrls={SVG_URLS} bgColor="#ffffff" />
}
