'use client';

import React, { useState, useEffect } from 'react';
import './CaseStudy.css';
import {
    CaseStudyHero,
    CaseStudySidebar,
    TextContentWithMetadata,
    ImageSection,
    TextSection,
    LottieSection
} from './components';

import InstagramThumbnail from '../../assets/instagram_events_cover.png';
import instagram00 from '../../assets/instagram_pictures/instagram_00.json';
import instagram01 from '../../assets/instagram_pictures/instagram_01.webp';
import instagram02 from '../../assets/instagram_pictures/instagram_02.json';
import instagram03 from '../../assets/instagram_pictures/instagram_03.json';
import instagram04 from '../../assets/instagram_pictures/instagram_04.png';
import instagram05 from '../../assets/instagram_pictures/instagram_05.png';

const imageUrls = [instagram00, instagram01, instagram02, instagram03, instagram04, instagram05];

const sidebarLinks = [
    { id: 'context', label: 'OVERVIEW' },
    { id: 'challenge', label: 'SOLUTION' },
    { id: 'reflection', label: 'REFLECTION' },
];

export const InstagramCaseStudy: React.FC = () => {
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
                image={InstagramThumbnail}
            />

            <div id="case-study-content-top" className="case-study-content-wrapper">
                <CaseStudySidebar
                    projectHeader="Instagram Events"
                    projectType="Reimagining the way people share and save events on Instagram"
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
                                    items: ['FIGMA', 'UI/UX DESIGN', 'CRITICAL DESIGN THINKING'],
                                },
                                {
                                    label: 'TEAM',
                                    items: ['SELF'],
                                },
                                {
                                    label: 'TIMELINE',
                                    items: ['SEPTEMBER 2025', '2 DAYS'],
                                },
                            ]}
                        />
                    </section>

                    {/* CONTEXT */}
                    <section id="context" className="case-study-section">
                        <TextSection
                            caption="OVERVIEW"
                            heading="Identify a Problem with Instagram... and Design a Solution"
                            body="This project was a 2 day design excercise where I was given the prompt to identify a problem with Instagram and design a solution. I chose to focus on the current challenges of event sharing and discovery on Instagram."
                            body2="As a college student involved in many clubs and activities, I often find myself struggling to keep track of all the events being shared on Instagram. Important event details are often buried in captions and often forgotten, and remembering to RSVP to each even can be a hassle. I wanted to design a solultion that would streamline the event discovery and participation process."
                        />
                    </section>

                    {/* IMAGES */}
                    <section id="challenge" className="case-study-section">
                        <TextSection
                            caption="SOLUTION"
                            heading="Using Metadata to Power Event Sharing and Discovery"
                            body="Through the new event creation flow, users can add data such as event name, date, location, and important links. This data is then used to power features such as calendar & third-party integration, location-based event discovery, and a shortened user flow of event discovery to event participation."
                        />
                        <LottieSection
                            src={imageUrls[0]}
                        />
                        <ImageSection
                            src={imageUrls[1]}
                            header="Add Key Event Details Through the New Event Creation Flow"
                            caption="Event details and third-party integrations can be added to an event post. The information is then used to power various features that enhance event discovery and participation."
                        />
                        <LottieSection
                            src={imageUrls[3]}
                        />
                        <LottieSection
                            src={imageUrls[2]}
                            header="RSVP to Events Effortlessly"
                            caption="Event posts now are supplemented with an RSVP button, allowing users to quickly access important event links."
                        />
                        <ImageSection
                            src={imageUrls[4]}
                            header="Data-Powered Event Discovery"
                            caption="Event posts now leverage metadata to enhance discovery and participation, making it easier for users to find and engage with local, relevant events."
                        />
                    </section>

                    {/* REFLECTION */}
                    <section id="reflection" className="case-study-section">
                        <TextSection
                            caption="REFLECTION"
                            heading="How Does it Fit Into Instagram's Design System?"
                            body="After designing my proposed Events feature, I took the time to reflect on how my designs fit into Instagram's existing design system. Where does it fit well, and more importantly how does it break from existing patterns?"
                            body2="One design choice that I reconsidered was the RSVP link on feed posts. This design choice uses Instagram's link banner component, which is typically seen only on ads and paid content posts. If this UI is now seen on free, non-ad posts, how would it interfere with current user expectations, and Instagrams business model?"
                        />
                        <ImageSection
                            src={imageUrls[5]}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default InstagramCaseStudy;