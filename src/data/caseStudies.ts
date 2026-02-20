import InstagramEvents from '../assets/Instagram-Events.json';
import tiktok from '../assets/tiktok.png';

export interface CaseStudy {
    id: number;
    caption: string;
    thumbnail: string | object;
    date: string;
}

export const caseStudiesData: CaseStudy[] = [
    {
        id: 1,
        caption: 'Encouraging public transit usage through a rewards-based system',
        date: 'SPECULATIVE, PROTOTYPE',
        thumbnail: "aa",
    },
    {
        id: 2,
        caption: 'Designing user-AI interactions for TikTok',
        date: 'INTERNSHIP',
        thumbnail: tiktok,
    },
    {
        id: 3,
        caption: 'Reimagining the way people share and save events on Instagram',
        date: 'SPECULATIVE, PROTOTYPE',
        thumbnail: InstagramEvents,
    },
    {
        id: 4,
        caption: 'Building a challenging multiplayer word game',
        date: 'REACT, FIREBASE',
        thumbnail: "aa",
    },

];
