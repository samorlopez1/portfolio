'use client';

import { Suspense } from 'react';
import { TrainTrekCaseStudy } from '@/src/pages/CaseStudy/TrainTrek';
import { TikTokCaseStudy } from '@/src/pages/CaseStudy/tiktok';
import { InstagramCaseStudy } from '@/src/pages/CaseStudy/instagram';
import { WordletCaseStudy } from '@/src/pages/CaseStudy/wordlet';
import { EACaseStudy } from '@/src/pages/CaseStudy/ea';
import '@/src/pages/CaseStudy/CaseStudy.css';

const caseStudies: Record<string, React.ComponentType> = {
    traintrek: TrainTrekCaseStudy,
    tiktok: TikTokCaseStudy,
    'instagram-events': InstagramCaseStudy,
    wordlet: WordletCaseStudy,
    ea: EACaseStudy,
};

export default function CaseStudyPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const CaseStudyComponent = caseStudies[id];

    if (!CaseStudyComponent) {
        return <div>Case study not found</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CaseStudyComponent />
        </Suspense>
    );
}

export function generateStaticParams() {
    return Object.keys(caseStudies).map((id) => ({
        id,
    }));
}
