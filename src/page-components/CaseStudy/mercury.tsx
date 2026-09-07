'use client';

import React, { useState, useEffect } from 'react';
import './CaseStudy.css';
import {
    CaseStudyHero,
    CaseStudySidebar,
    TextContentWithMetadata,
    TextSection,
    ImageSection,
    VideoSection,
} from './components';

import MercuryThumbnail from '../../assets/Mercury_grey.png';
import mercuryFrame1 from '../../assets/mercury_pictures/mercury_frame_1.png';
import mercuryFrame2 from '../../assets/mercury_pictures/mercury_frame_2.png';
import mercuryFrame8 from '../../assets/mercury_pictures/mercury_frame_8.png';


const sidebarLinks = [
    { id: 'context', label: 'OVERVIEW' },
    { id: 'challenge', label: 'WORKS' },
];

export const MercuryCaseStudy: React.FC = () => {
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
                image={MercuryThumbnail}
            />

            <div id="case-study-content-top" className="case-study-content-wrapper">
                <CaseStudySidebar
                    projectHeader="Mercury"
                    projectType="Shipping activation-focused empty states for Mercury's growth team"
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
                                    items: ['PROTOTYPING', 'VIBE-CODING', 'USER TESTING'],
                                },
                                {
                                    label: 'TEAM',
                                    items: ['SELF', 'TREYCE MEREDITH (MENTOR)'],
                                },
                                {
                                    label: 'TIMELINE',
                                    items: ['SUMMER 2026', '3 MONTHS'],
                                },
                            ]}
                        />
                    </section>

                    {/* CONTEXT */}
                    <section id="context" className="case-study-section">
                        <TextSection
                            caption="OVERVIEW"
                            heading="Ideating, prototyping, and shipping quickly with AI design tools"
                            body="As a growth designer at Mercury, I used AI design tools and workflows to ideate and deliver new empty states, working closely with engineers to get both frontend and backend code shipped."
                            body2="By the end of the internship, I shipped two empty state solutions, one currently live and one going through AB testing, seeing a positive 3% lift in treasury applications."
                        />
                    </section>

                    {/* IMAGES */}
                    <section id="challenge" className="case-study-section">
                        <ImageSection
                            src={mercuryFrame1}
                            src2={mercuryFrame2}
                            caption="Complete and semi-empty states for the transactions page."
                        />
                        <VideoSection
                            src="/mercury_pictures/mercury_scene_1.mp4"
                            src2="/mercury_pictures/mercury_scene_2.mp4"
                            caption="Post-onboarding upsell exploration for Mercury's budgets feature."
                        />
                        <VideoSection
                            src="/mercury_pictures/mercury_scene_3.mp4"
                            caption="Custom tools for vibe-coding design environment."
                        />
                        <ImageSection
                            src={mercuryFrame8}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default MercuryCaseStudy;
