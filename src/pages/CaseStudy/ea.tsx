import React, { useState, useEffect } from 'react';
import './CaseStudy.css';
import {
    CaseStudyHero,
    CaseStudySidebar,
    TextContentWithMetadata,
    TextSection,
    ImageSection,
} from './components';

import eaThumbnail from '../../assets/ea.png';
import eaPic from '../../assets/ea_pictures/ea.png';

const sidebarLinks = [
    { id: 'context', label: 'OVERVIEW' },
    { id: 'challenge', label: 'WORKS' },
];

export const EACaseStudy: React.FC = () => {
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
                image={eaThumbnail}
            />

            <div id="case-study-content-top" className="case-study-content-wrapper">
                <CaseStudySidebar
                    projectHeader="Electronic Arts"
                    projectType="Enhancing Gameplay Through Second-Screen Experiences"
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
                                    items: ['UX DESIGNER', 'UX RESEARCHER'],
                                },
                                {
                                    label: 'SKILLS',
                                    items: ['RESEARCH SYNTHESIS', 'PROTOTYPING', 'UX DESIGN'],
                                },
                                {
                                    label: 'TEAM',
                                    items: ['ME', 'ANNIE CHANG', 'SUE JO', 'YURI YANG', 'RIGO ORDAZ (MENTOR)'],
                                },
                                {
                                    label: 'TIMELINE',
                                    items: ['WINTER 2026', '6 MONTHS'],
                                },
                            ]}
                        />
                    </section>

                    {/* CONTEXT */}
                    <section id="context" className="case-study-section">
                        <TextSection
                            caption="OVERVIEW"
                            heading="Enhancing Gameplay Through Second-Screen Experiences"
                            body="For my capstone project at the University of Washington, my team and I partnered with EA to explore how second-screen experiences can enhance player engagement and enjoyment in gaming."
                            body2="This case study is currently in progress."
                        />
                    </section>

                    <section id="works" className="case-study-section">
                        <ImageSection
                            src={eaPic}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default EACaseStudy;
