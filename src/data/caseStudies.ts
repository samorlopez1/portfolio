import instagram from '../assets/instagram_events_cover.webp';
import tiktok from '../assets/tiktok.png';
import wordlet from '../assets/wordlet2.png';
import traintrek from '../assets/traintrek_cover.webp';
import ea from '../assets/ea.png';
import stealth from '../assets/stealth.png';
import type { StaticImageData } from 'next/image';

export interface CaseStudy {
    id: number;
    caption: string;
    thumbnail: string | object | StaticImageData;
    date: string;
    posterImage?: string | StaticImageData;
    route?: string;
    shouldPrefetch?: boolean;
}

export const caseStudiesData: CaseStudy[] = [
    {
        id: 1,
        caption: 'Incentivising public transit usage through rewards',
        date: 'SPECULATIVE, PROTOTYPE',
        thumbnail: "https://dl.dropboxusercontent.com/scl/fi/ds2cqvyov05jgy38x3vnq/Mockup-Vid-3.mp4?rlkey=5nr7xpiqja7br169y6c4pu4zc&st=f5flje9l&dl=0",
        posterImage: traintrek,
        route: '/case-study/traintrek',
        shouldPrefetch: true,
    },
    {
        id: 2,
        caption: 'Designing user-AI interactions for TikTok',
        date: 'INTERNSHIP',
        thumbnail: tiktok,
        route: '/case-study/tiktok',
        shouldPrefetch: true,
    },
    {
        id: 3,
        caption: 'Reimagining the way people share and save events on Instagram',
        date: 'SPECULATIVE, PROTOTYPE',
        thumbnail: instagram,
        route: '/case-study/instagram-events'
    },
    {
        id: 4,
        caption: 'Building a challenging multiplayer word game',
        date: 'REACT, FIREBASE',
        thumbnail: "https://dl.dropboxusercontent.com/scl/fi/aqfbdi0k6fy9r388g0i6o/wordlet.mp4?rlkey=jq5aucif6k6uu2qjucz6yf6vl&st=tnvexotf&dl=0",
        posterImage: wordlet,
        route: '/case-study/wordlet'
    },
    {
        id: 5,
        caption: 'Enhancing gameplay through second-screen experiences',
        date: 'CONTRACT',
        thumbnail: ea,
        route: '/case-study/ea'
    },
    {
        id: 6,
        caption: 'Sole interaction designer for smart home living experiences',
        date: 'INTERNSHIP (NDA)',
        thumbnail: stealth,
        route: ''
    },

];
