'use client';

import React, { useState, useEffect } from 'react';
import './CaseStudy.css';
import {
    CaseStudyHero,
    CaseStudySidebar,
    TextContentWithMetadata,
    TextSection,
    LottieSection
} from './components';

import TikTokThumbnail from '../../assets/tiktok.png';

const imageUrls = ['/animations/tiktok_01.json'];


const sidebarLinks = [
    { id: 'context', label: 'OVERVIEW' },
    { id: 'challenge', label: 'WORKS' },
];

export const TikTokCaseStudy: React.FC = () => {
    const [activeSection, setActiveSection] = useState('context');

    useEffect(() => {
        const ids = sidebarLinks.map(l => l.id);

        const handleScroll = () => {
            const threshold = window.innerHeight * 0.4;
            let current = ids[0];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (!el) continue;
                if (el.getBoundingClientRect().top <= threshold) {
                    current = id;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <CaseStudyHero
                image={TikTokThumbnail}
            />

            <div id="case-study-content-top" className="case-study-content-wrapper">
                <CaseStudySidebar
                    projectHeader="TikTok"
                    projectType="Designing AI-Human Interactions for TikTok Effect House & TikTok Creation"
                    links={sidebarLinks}
                    activeSection={activeSection}
                    onSectionClick={setActiveSection}
                />

                <main className="case-study-main-content">
                    {/* CONTEXT */}
                    <section id="context" className="case-study-section">
                        <TextContentWithMetadata
                            metadata={[
                                {
                                    label: 'ROLE',
                                    items: ['PRODUCT DESIGNER'],
                                },
                                {
                                    label: 'SKILLS',
                                    items: ['FIGMA', 'CROSS-COLLABORATION', 'RAPID IDEATION'],
                                },
                                {
                                    label: 'TEAM',
                                    items: ['SELF'],
                                },
                                {
                                    label: 'TIMELINE',
                                    items: ['FALL 2025', '6 MONTHS'],
                                },
                            ]}
                        />
                    </section>

                    {/* CONTEXT */}
                    <section id="context" className="case-study-section">
                        <TextSection
                            caption="OVERVIEW"
                            heading="Designing the Future of AR Creation on TikTok"
                            body="As a Product Design Intern at TikTok, I contributed to the Effect House (AR creation platform) and Creation teams. In the fall, I focused on designing AI–human interaction systems, visual branding, and an icon set for Effect House. My internship was extended into the winter, where I continued designing for the Creation team, supporting tools used by millions of creators."
                        />
                    </section>

                    {/* IMAGES */}
                    <section id="challenge" className="case-study-section">
                        <LottieSection
                            src={imageUrls[0]}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default TikTokCaseStudy;
