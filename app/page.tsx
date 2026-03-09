'use client';

import { Hero } from '@/src/components/Hero';
import { CaseStudies } from '@/src/components/CaseStudies';
import { AboutSection } from '@/src/components/AboutSection';
import '@/src/page-components/Home/Home.css';

export const dynamic = 'force-dynamic';

export default function Home() {
    return (
        <div className="home-page-wrapper">
            <div className="home-page">
                <Hero />
                <section id="work">
                    <CaseStudies />
                </section>
                <section id="about">
                    <AboutSection />
                </section>
            </div>
        </div>
    );
}
