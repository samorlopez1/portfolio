import instagram from '../assets/instagram2.png';
import tiktok from '../assets/tiktok2.png';
import wordlet from '../assets/wordlet2.png';
import traintrek from '../assets/traintrek2.png';
import ea from '../assets/ea2.png';
import spur from '../assets/spur.png';
import mercury from '../assets/mercury.png';
import stealth from '../assets/4est2.png';
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
}

export const caseStudiesData: CaseStudy[] = [
    {
        id: 1,
        caption: '',
        date: '',
        thumbnail: mercury,
        route: '',
        aspectRatio: 'landscape',
    },
    {
        id: 2,
        caption: '',
        date: '',
        thumbnail: spur,
        route: '',
        aspectRatio: 'portrait',
    },
    {
        id: 3,
        caption: 'Reimagining the way people share and save events on Instagram',
        date: 'SPECULATIVE, PROTOTYPE',
        thumbnail: instagram,
        route: '/case-study/instagram-events',
        aspectRatio: 'portrait',
    },
    {
        id: 4,
        caption: 'Designing user-AI interactions for TikTok',
        date: 'INTERNSHIP',
        thumbnail: tiktok,
        route: '/case-study/tiktok',
        shouldPrefetch: true,
        aspectRatio: 'landscape',
    },
    {
        id: 5,
        caption: 'Enhancing gameplay through second-screen experiences',
        date: 'CONTRACT',
        thumbnail: ea,
        route: '/case-study/ea',
        aspectRatio: 'landscape',
    },
    {
        id: 6,
        caption: 'Building a challenging multiplayer word game',
        date: 'REACT, FIREBASE',
        thumbnail: "https://dl.dropboxusercontent.com/scl/fi/aqfbdi0k6fy9r388g0i6o/wordlet.mp4?rlkey=jq5aucif6k6uu2qjucz6yf6vl&st=tnvexotf&dl=0",
        posterImage: wordlet,
        route: '/case-study/wordlet',
        aspectRatio: 'portrait',
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
    },
    {
        id: 8,
        caption: 'Sole interaction designer for smart home living experiences',
        date: 'INTERNSHIP (NDA)',
        thumbnail: stealth,
        route: '',
        aspectRatio: 'landscape',
    },
];
