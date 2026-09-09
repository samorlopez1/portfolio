import instagram from '../assets/instagram_events_cover.webp';
import tiktok from '../assets/TikTok_color.png';
import wordlet from '../assets/wordlet_cover.webp';
import traintrek from '../assets/traintrek_cover.webp';
import ea from '../assets/EA_color.png';
import spur from '../assets/Spur_cover.png';
import mercury from '../assets/Mercury_color.png';
import stealth from '../assets/4EST_color.png';
import type { StaticImageData } from 'next/image';

export interface CaseStudy {
    id: number;
    caption: string;
    thumbnail?: string | object | StaticImageData;
    date: string;
    posterImage?: string | StaticImageData;
    route?: string;
    shouldPrefetch?: boolean;
    aspectRatio: 'landscape' | 'portrait';
    imageX?: string;
    mobileOrder?: number;
}

export const caseStudiesData: CaseStudy[] = [
    {
        id: 1,
        caption: 'Exploring growth-focused empty states',
        date: 'INTERNSHIP',
        thumbnail: mercury,
        route: '/case-study/mercury',
        aspectRatio: 'landscape',
        mobileOrder: 1,
    },
    {
        id: 2,
        caption: 'Turning digital clutter into creative action',
        date: 'SPECULATIVE, PROTOTYPE, MOTION',
        thumbnail: "https://dl.dropboxusercontent.com/scl/fi/34kjxz5abuvkoru2cai6i/Spur-video.mp4?rlkey=vtnhqlq95shnkbj1z92nvb8zz&st=t85o1w38&dl=0",
        posterImage: spur,
        route: '',
        aspectRatio: 'portrait',
        mobileOrder: 2,
    },
    {
        id: 3,
        caption: 'Reimagining the way people share and save events on Instagram',
        date: 'SPECULATIVE, PROTOTYPE',
        thumbnail: instagram,
        route: '/case-study/instagram-events',
        aspectRatio: 'portrait',
        mobileOrder: 3,
    },
    {
        id: 4,
        caption: 'Designing user-AI interactions for TikTok',
        date: 'INTERNSHIP',
        thumbnail: tiktok,
        route: '/case-study/tiktok',
        shouldPrefetch: true,
        aspectRatio: 'landscape',
        mobileOrder: 4,
    },
    {
        id: 5,
        caption: 'Enhancing gameplay through second-screen experiences',
        date: 'CAPSTONE',
        thumbnail: ea,
        aspectRatio: 'landscape',
        route: '/case-study/ea',
        mobileOrder: 5,
    },
    {
        id: 6,
        caption: 'Building a challenging multiplayer word game',
        date: 'REACT, FIREBASE',
        thumbnail: "https://dl.dropboxusercontent.com/scl/fi/aqfbdi0k6fy9r388g0i6o/wordlet.mp4?rlkey=jq5aucif6k6uu2qjucz6yf6vl&st=tnvexotf&dl=0",
        posterImage: wordlet,
        route: '/case-study/wordlet',
        aspectRatio: 'portrait',
        imageX: '40%',
        mobileOrder: 6,
    },
    {
        id: 7,
        caption: 'Incentivising public transit usage through rewards',
        date: 'SPECULATIVE, PROTOTYPE',
        thumbnail: "https://dl.dropboxusercontent.com/scl/fi/ds2cqvyov05jgy38x3vnq/Mockup-Vid-3.mp4?rlkey=5nr7xpiqja7br169y6c4pu4zc&st=f5flje9l&dl=0",
        posterImage: traintrek,
        route: '/case-study/traintrek',
        shouldPrefetch: true,
        aspectRatio: 'portrait',
        imageX: '30%',
        mobileOrder: 7,
    },
    {
        id: 8,
        caption: 'Sole interaction designer for smart home living experiences',
        date: 'INTERNSHIP (NDA)',
        thumbnail: stealth,
        route: '',
        aspectRatio: 'landscape',
        mobileOrder: 8,
    },
];
