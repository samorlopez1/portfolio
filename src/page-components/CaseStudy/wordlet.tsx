'use client';

import React, { useState, useEffect } from 'react';
import './CaseStudy.css';
import {
    CaseStudyHero,
    CaseStudySidebar,
    TextContentWithMetadata,
    ImageSection,
    TextSection,
    VideoSection,
} from './components';
import type { StaticImageData } from 'next/image';

import WordletCover from '../../assets/wordlet_cover.webp';
import WordletThumbnail from '../../assets/wordlet.webp';
import wordlet01 from '../../assets/wordlet_pictures/wordlet_01.png';
import wordlet02 from '../../assets/wordlet_pictures/wordlet_02.webp';
import wordlet03 from '../../assets/wordlet_pictures/wordlet_03.png';
import wordlet04 from '../../assets/wordlet_pictures/wordlet_04.png';

const imageUrls: (StaticImageData | string)[] = ['/wordlet_00.mp4', wordlet01, wordlet02, wordlet03, wordlet04];

const sidebarLinks = [
    { id: 'context', label: 'OVERVIEW' },
    { id: 'challenge', label: 'WORKS' },
    { id: 'reflection', label: 'REFLECTION' }
];

export const WordletCaseStudy: React.FC = () => {
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
                image="https://dl.dropboxusercontent.com/scl/fi/aqfbdi0k6fy9r388g0i6o/wordlet.mp4?rlkey=jq5aucif6k6uu2qjucz6yf6vl&st=tnvexotf&dl=0"
                coverImage={WordletCover}
            />

            <div id="case-study-content-top" className="case-study-content-wrapper">
                <CaseStudySidebar
                    projectHeader="Wordlet"
                    projectType="Building a challenging, browser-based multiplayer word game"
                    projectUrl='https://wordlet-a9ae1.web.app/'
                    projectUrlLabel='PLAY WORDLET'
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
                                    items: ['WEB DEVELOPER', 'GAME DESIGNER'],
                                },
                                {
                                    label: 'SKILLS',
                                    items: ['REACT', 'FIREBASE', 'HTML/CSS'],
                                },
                                {
                                    label: 'TEAM',
                                    items: ['SELF'],
                                },
                                {
                                    label: 'TIMELINE',
                                    items: ['SPRING 2025', '1 WEEK'],
                                },
                            ]}
                        />
                    </section>

                    {/* CONTEXT */}
                    <section id="context" className="case-study-section">
                        <TextSection
                            caption="OVERVIEW"
                            heading="Building a Challenging, Browser-Based Multiplayer Word Game"
                            body="Inspired by games such as Bomb Party and Monkeytype, Wordlet is a word game that challenges players to think quickly and creatively. As the sole developer, I had to tackle creating the game's core mechanics, implementing real-time multiplayer functionality and optimization strategies with Firebase, and designing a clean and engaging visual identity."
                        />
                    </section>

                    {/* IMAGES */}
                    <section id="challenge" className="case-study-section">
                        <VideoSection
                            src={imageUrls[0] as string}
                            header="Type as many words as possible!"
                            caption="The player is given with a two-letter prompt, must enter as many words as they can that contain the prompt. Prompts rotate every 20 seconds, and players can combo past prompts for extra points."
                        />
                        <ImageSection
                            src={imageUrls[1] as StaticImageData}
                            caption="Words that contain previous substring prompts earn bonus points."
                        />
                        <ImageSection
                            src={imageUrls[2] as StaticImageData}
                            caption="Example final summary screen"
                        />
                        <ImageSection
                            src={imageUrls[3] as StaticImageData}
                            header="Multiplayer functionality with Firebase"
                            caption="Players can either host a game or join an existing game by entering the lobby code."
                        />

                        <TextSection
                            caption="CHALLENGE"
                            heading="Optimizing the Backend"
                            body="Since the game only accepts valid English words, I needed a way to verify user input. My initial approach was to include a 43MB file of the English dictionary directly in the application, but this caused every user to download the full file on each visit—resulting in heavy resource usage."
                            body2="To reduce the download size, I moved the dictionary to Firebase and implemented a system that loads only the necessary portions of the file as the game progresses. This significantly reduced the app’s initial download size and ultimately allowed me to support twice as many concurrent players with a free Firebase plan."
                        />

                        <ImageSection
                            src={imageUrls[4]}
                            caption="By optimizing the way users loaded in the dictionary file, my game was able to double the max number of players it can support under Firebase's free hosting plan."
                        />
                    </section>

                    <section id="reflection" className="case-study-section">
                        <TextSection
                            caption="REFLECTION"
                            heading="Recognizing the impact UI has on cost and efficiency"
                            body="Working on this project gave me a deeper understanding of how design decisions directly impacts the performance and costs of a product. Being both a UI / UX designer and a developer revealed to me how impactful the front-end experience is to technical scalability, and the challenges I faced while trying to optimize wordlet! showed me how the UI and user flow of an app greatly determines the operational costs and resources the app needs to function."
                            body2="This experience taught me that thoughtful, intentional design goes beyond just aesthetics or usability, but that good design also means creating sustainable and efficient products."
                        />
                        <ImageSection
                            src={WordletThumbnail}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default WordletCaseStudy;
