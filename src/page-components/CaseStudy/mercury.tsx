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
    BeforeAfterSlider,
} from './components';

import MercuryThumbnail from '../../assets/Mercury_grey.png';
import mercuryFrame1 from '../../assets/mercury_pictures/mercury_frame_1.png';
import mercuryFrame2 from '../../assets/mercury_pictures/mercury_frame_2.png';
import mercuryFrame8 from '../../assets/mercury_pictures/mercury_frame_8.png';
import emptyStateResearch from '../../assets/mercury_pictures/1001.png';
import testingConcepts from '../../assets/mercury_pictures/1002.png';
import testingInsights from '../../assets/mercury_pictures/1003.png';
import treasuryExploration from '../../assets/mercury_pictures/1005.png';
import shippedPRs from '../../assets/mercury_pictures/1006.png';
import transactionsBefore from '../../assets/mercury_pictures/image 107.png';
import transactionsAfter from '../../assets/mercury_pictures/image 98.png';
import reimbursementsEmptyState from '../../assets/mercury_pictures/3.png';


const sidebarLinks = [
    { id: 'context', label: 'OVERVIEW' },
    { id: 'deliverables', label: 'FINAL' },
    { id: 'challenge', label: 'CHALLENGE' },
    { id: 'process', label: 'PROCESS' },
    { id: 'first-deliverable', label: 'DELIVERABLE 1' },
    { id: 'insights', label: 'INSIGHTS' },
    { id: 'second-deliverable', label: 'DELIVERABLE 2' },
    { id: 'extra', label: 'EXTRA' },
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
                                    items: ['ME', 'TREYCE MEREDITH (MENTOR)', 'VICTORIA PEART (ENG PARTNER)'],
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

                    <section id='deliverables' className="case-study-section">
                        <TextSection
                            caption="FINAL"
                            heading="Complete and semi-empty states for the transactions page"
                            body="My final deliverables redesigned the transactions page to a more activation-focused framing, using the space and early user experience to encourage eligible users to apply for a treasury account."
                        />

                        <ImageSection
                            src={mercuryFrame1}
                            src2={mercuryFrame2}
                            caption="Complete and semi-empty states for the transactions page."
                        />
                    </section>

                    <section id='challenge' className="case-study-section">
                        <TextSection
                            caption="CHALLENGE"
                            heading="How might we leverage empty states to drive activation?"
                            body="Looking at Mercury's empty states, they're straightforward but don't activate that many users. This prompted an exploration into new empty state designs focused on driving user activation."
                        />

                        <ImageSection
                            src={reimbursementsEmptyState}
                            src2={transactionsBefore}
                        />
                    </section>

                    <section id='process' className="case-study-section">
                        <TextSection
                            caption="PROCESS"
                            heading="Auditing empty states and unmoderated testing"
                            body="I begain with an audit, looking at 80+ empty state examples and driving common themes and patterns from them, helping me to think divergently about the new empty states. I took 3 promising concepts and conducted unmoderated testing using Maze."

                        />
                        <ImageSection
                            src={emptyStateResearch}
                            src2={testingConcepts} />
                    </section>

                    <section id='first-deliverable' className="case-study-section">
                        <TextSection
                            caption="DELIVERABLE 1"
                            heading="Minimal changes had the best feedback"
                            body="Users responded the best towards the design that added a simple graphic. Following this, I designed and shipped a new empty state for transactions."
                        />

                        <BeforeAfterSlider
                            before={transactionsBefore}
                            after={transactionsAfter}
                            header="Refreshing treasury's empty state"
                            caption="The new empty state has a graphic that helps contextualize the page for users, and is horizontally split to keep the page tight and responsive."
                        />
                    </section>


                    <section id='insights' className="case-study-section">
                        <TextSection
                            caption="INSIGHTS"
                            heading="The right idea, but at the wrong time"
                            body="The unmoderated testing revealed that while the concepts, such as the tutorial or command focused framing would be helpful, they were not positioned effectively. A user seeing a to-do list right after onboarding and setting up an account lacks the context and understanding to fully engage with it."

                        />
                        <ImageSection
                            src={testingInsights}
                            src2={treasuryExploration}
                        />
                    </section>

                    <section id="second-deliverable" className="case-study-section">
                        <TextSection
                            caption="DELIVERABLE 2"
                            heading="Early user behavior as an opportunity to upsell treasury"
                            body="Landing on a treausy upsell, I explored a semi-empty state for the transacitons page. Users who are close to eligible for a treasuy account will see an upsell to open a treasury account. Users who are close to the minimum threshold will be prompted to add funds, and users who are eligible will see a CTA to open a treasury account."
                        />
                        <ImageSection
                            src={mercuryFrame2}
                        />
                        <VideoSection
                            src="/mercury_pictures/mercury_scene_1.mp4"
                            header="A new layer for activation"
                            caption="Mercury currently doesn't have a footer banner pattern, so this design gives the activation team a new layer to work with."
                        />

                        <ImageSection
                            src={shippedPRs}
                            header="Shipping the treasury upsell experiment"
                            caption="Using cursor, I coded the backend and frontend for the treasury upsell AB experiment to production, with help with my engineering partner."
                        />

                        <ImageSection
                            src={mercuryFrame8}
                            header="AB Test Results"
                            caption="The treasury upsell saw a 3% increase in treasury application, which is a win for activation!"

                        />
                    </section>

                    <section id="extra" className="case-study-section">
                        <TextSection
                            caption="EXTRA"
                            heading="Exploring AI-Design tools and side projects"
                            body="During my internship, I had the opportunity to explore new ways I could leverage AI in my design process, and had the opportunity to work on other side projects for Mercury."
                        />

                        <VideoSection
                            src="/mercury_pictures/mercury_scene_3.mp4"
                            caption="I made a custom tool to help me quickly iterate adjust the design directly in the browser. The tool lets me adjust tokens and parameters, and create presets to compare. I can export the final draft as a text input to send back to my agent."
                        />

                        <VideoSection
                            src="/mercury_pictures/mercury_scene_2.mp4"
                            caption="Exploring a feature upsell for Mercury budgets."
                        />

                    </section>
                </main>
            </div>
        </div>
    );
};

export default MercuryCaseStudy;
