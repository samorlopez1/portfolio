import { Suspense } from 'react';
import type { ComponentType } from 'react';
import { notFound } from 'next/navigation';
import '@/src/page-components/CaseStudy/CaseStudy.css';

type CaseStudyModule = {
    default: ComponentType;
};

const CASE_STUDY_IDS = ['traintrek', 'tiktok', 'instagram-events', 'wordlet', 'ea'] as const;

async function loadCaseStudyComponent(id: string): Promise<ComponentType | null> {
    switch (id) {
        case 'traintrek':
            return (await import('@/src/page-components/CaseStudy/TrainTrek') as CaseStudyModule).default;
        case 'tiktok':
            return (await import('@/src/page-components/CaseStudy/tiktok') as CaseStudyModule).default;
        case 'instagram-events':
            return (await import('@/src/page-components/CaseStudy/instagram') as CaseStudyModule).default;
        case 'wordlet':
            return (await import('@/src/page-components/CaseStudy/wordlet') as CaseStudyModule).default;
        case 'ea':
            return (await import('@/src/page-components/CaseStudy/ea') as CaseStudyModule).default;
        default:
            return null;
    }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const CaseStudyComponent = await loadCaseStudyComponent(id);

    if (!CaseStudyComponent) {
        notFound();
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CaseStudyComponent />
        </Suspense>
    );
}

export async function generateStaticParams() {
    return CASE_STUDY_IDS.map((id) => ({
        id,
    }));
}
