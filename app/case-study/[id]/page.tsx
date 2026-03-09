import { Suspense } from 'react';
import { TrainTrekCaseStudy } from '@/src/page-components/CaseStudy/TrainTrek';
import { TikTokCaseStudy } from '@/src/page-components/CaseStudy/tiktok';
import { InstagramCaseStudy } from '@/src/page-components/CaseStudy/instagram';
import { WordletCaseStudy } from '@/src/page-components/CaseStudy/wordlet';
import { EACaseStudy } from '@/src/page-components/CaseStudy/ea';
import '@/src/page-components/CaseStudy/CaseStudy.css';

export const dynamic = 'force-dynamic';

const caseStudies: Record<string, React.ComponentType> = {
    traintrek: TrainTrekCaseStudy,
    tiktok: TikTokCaseStudy,
    'instagram-events': InstagramCaseStudy,
    wordlet: WordletCaseStudy,
    ea: EACaseStudy,
};

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
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

export async function generateStaticParams() {
    return Object.keys(caseStudies).map((id) => ({
        id,
    }));
}
