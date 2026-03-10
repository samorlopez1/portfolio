'use client';

import React, { useState, useEffect } from 'react';
import './CaseStudy.css';
import {
    CaseStudyHero,
    CaseStudySidebar,
    TextContentWithMetadata,
    ImageSection,
    TextSection,
} from './components';

// Static imports for Next.js
import trainTrekCover from '../../assets/traintrek_cover.webp';
import traintrek01 from '../../assets/traintrek_pictures/traintrek_01.png';
import traintrek02 from '../../assets/traintrek_pictures/traintrek_02.png';
import traintrek03 from '../../assets/traintrek_pictures/traintrek_03.png';
import traintrek04 from '../../assets/traintrek_pictures/traintrek_04.png';
import traintrek05 from '../../assets/traintrek_pictures/traintrek_05.png';
import traintrek06 from '../../assets/traintrek_pictures/traintrek_06.png';
import traintrek07 from '../../assets/traintrek_pictures/traintrek_07.png';
import traintrek08 from '../../assets/traintrek_pictures/traintrek_08.png';
import traintrek09 from '../../assets/traintrek_pictures/traintrek_09.png';
import traintrek10 from '../../assets/traintrek_pictures/traintrek_10.png';
import traintrek11 from '../../assets/traintrek_pictures/traintrek_11.png';
import traintrek12 from '../../assets/traintrek_pictures/traintrek_12.png';
import traintrek13 from '../../assets/traintrek_pictures/traintrek_13.png';
import traintrek14 from '../../assets/traintrek_pictures/traintrek_14.png';
import traintrek15 from '../../assets/traintrek_pictures/traintrek_15.png';

const imageUrls = [traintrek01, traintrek02, traintrek03, traintrek04, traintrek05, traintrek06, traintrek07, traintrek08, traintrek09, traintrek10, traintrek11, traintrek12, traintrek13, traintrek14, traintrek15];

const sidebarLinks = [
    { id: 'context', label: 'OVERVIEW' },
    { id: 'challenge', label: 'CHALLENGE' },
    { id: 'solution', label: 'SOLUTION' },
    { id: 'process', label: 'PROCESS' },
    { id: 'reflection', label: 'REFLECTION' },
];

export const TrainTrekCaseStudy: React.FC = () => {
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
                image="https://dl.dropboxusercontent.com/scl/fi/ds2cqvyov05jgy38x3vnq/Mockup-Vid-3.mp4?rlkey=5nr7xpiqja7br169y6c4pu4zc&st=f5flje9l&dl=0"
                coverImage={trainTrekCover}
            />

            <div id="case-study-content-top" className="case-study-content-wrapper">
                <CaseStudySidebar
                    projectHeader="TrainTrek"
                    projectType="Encouraging public transportation usage through incentives and rewards"
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
                                    items: ['PRODUCT DESIGNER', 'PRODUCT RESEARCHER'],
                                },
                                {
                                    label: 'SKILLS',
                                    items: ['UI/UX DESIGN', 'PROTOTYPING', 'SPECULATIVE DESIGN'],
                                },
                                {
                                    label: 'TEAM',
                                    items: ['MADISON MCLEAN', 'THEO TZANKINOV', 'OLIVER CHEN'],
                                },
                                {
                                    label: 'TIMELINE',
                                    items: ['SUMMER 2025', '8 WEEKS'],
                                },
                            ]}
                        />
                    </section>

                    {/* CONTEXT */}
                    <section id="context" className="case-study-section">
                        <TextSection
                            caption="OVERVIEW"
                            heading="What is TrainTrek?"
                            body="In Seattle, buses and light rail cover much of the city, yet many younger commuters still prefer to drive. While safety, cleanliness, and speed concerns remain, one major barrier is the lack of clear incentive to choose public transit over a car."
                            body2="TrainTrek bridges this gap by rewarding riders for their trips. With points earned for every ride, a focused map of participating businesses, and easy QR code redemption, TrainTrek turns public transit into a rewarding habit."
                        />
                    </section>

                    {/* CHALLENGE */}
                    <section id="challenge" className="case-study-section">
                        <TextSection
                            caption="CHALLENGE"
                            heading="Create a digital product / service that increases public transportation usage in the Seattle area."
                        />
                    </section>

                    {/* SOLUTION */}
                    <section id="solution" className="case-study-section">
                        <TextSection
                            caption="SOLUTION"
                            heading="Your commute, rewarded"
                            body="By linking your transit card, you earn points for every ride, then redeem them for discounts at participating local businesses."
                        />
                        <ImageSection
                            src={imageUrls[0]}
                            header="Your commuter dashboard"
                            caption="Overview, nearby rewards, summary, and achievement screens keep 
                            commuters updated with their point totals and their progress."
                        />
                        <ImageSection
                            src={imageUrls[1]}
                            header="Find participating businesses"
                            caption="Users can browse for participating businesses to use their points at."
                        />
                        <ImageSection
                            src={imageUrls[2]}
                            caption="Promotion details, location, and necessary information are 
                            displayed on one easily scannable page."
                            header="Use points for rewards"
                        />
                        <ImageSection
                            src={imageUrls[3]}
                            header="Scan your code in-store to redeem"
                            caption="Claimed promotions can be found in the scan page. Users also have a personal wallet, so that 
                            commuters can use their points in person without needing to redeem a promotion in the app."
                        />
                        <ImageSection
                            src={imageUrls[4]}
                            header="Easy for businesses to participate"
                            caption="Businesses are provided with a summary of their promotion details 
                            and general information about their store."
                        />
                    </section>

                    {/* PROCESS */}
                    <section id="process" className="case-study-section">
                        <TextSection
                            caption="USER RESEARCH"
                            heading="Understanding the problem"
                            body="Through surveys and short 30 minute interviews, we uncovered key perceptions and insights:"
                        />
                        <ImageSection
                            src={imageUrls[5]}
                        />

                        <TextSection
                            caption="COMPETITIVE ANALYSIS"
                            heading="What transportation apps currently exist?"
                            body="Through competitor analysis, we focused on how these apps promote transportation usage and include an interactive map."
                        />
                        <ImageSection
                            src={imageUrls[6]}
                        />

                        <TextSection
                            caption="INSIGHT"
                            heading="Commuting is more than just riding the bus"
                            body="During our user research, we also found that many people, specifically students, haven't ventured much outside of campus throughout the several years they have been in college."
                            body2="We wanted to improve public transportation ridership by invoking behavioral changes — that the bus wasn't just a mode of transport but a way to explore your city."
                        />
                        <ImageSection
                            src={imageUrls[7]}
                        />

                        <TextSection
                            caption="CHALLENGES"
                            heading="Our main factors to consider"
                        />
                        <ImageSection
                            src={imageUrls[8]}
                            caption="Design process overview and key milestones"
                        />

                        <TextSection
                            caption="HOW MIGHT WE..."
                            heading="How might we promote public transportation usage by making commuting more rewarding and attractive?"
                        />

                        <TextSection
                            caption="IDEATION"
                            heading="Figuring out our direction"
                            body="We considered two ways to implement our idea. The first focused on promoting the discovery of a city, and the second focused on promoting the businesses that would participate with the rewards program."
                        />
                        <ImageSection
                            src={imageUrls[9]}
                        />

                        <TextSection
                            caption="DESIGN EXPLORATION"
                            heading="Exploring option 1"
                            body="We decided to proceed with option 1. Our main concern with option 2 was its potential to be seen as a competitor to large apps such as Google Maps and Yelp, and unless we implemented everything they had and more, we were worried that we'd end up with a less successful product."
                        />
                        <ImageSection
                            src={imageUrls[10]}
                            caption="The explore page recommends the user with fun and popular Seattle destinations, and the estimated points earned if visited using transit. The rewards page displays a list of participating businesses offering discounts in exchange for points."
                        />

                        <TextSection
                            caption="ROADBLOCK"
                            heading="A fatal flaw we missed"
                            body="Partway through designing option 1, we realized one fatal flaw with this system. Seattle transit operates on a tap-on only system, meaning that there was no reliable way to keep track of a persons commute length. This meant that points had to be at a certain fixed amount of points per ride, making the explore page lose its value."
                        />
                        <ImageSection
                            src={imageUrls[11]}
                        />

                        <TextSection
                            caption="PIVOT"
                            heading="Reconsidering option 2"
                            body="Having realized this, I decided to pivot the app to option 2: including a map, but this time refraining from providing details and fully focusing on participating businesses. With this, there were some things to consider when refocusing the final app around option 2:"
                        />
                        <ImageSection
                            src={imageUrls[12]}
                            caption="Our key design challenges"
                        />

                        <TextSection
                            caption="FINAL DESIGN"
                            heading="Turning everyday transit rides into a rewarding habit"
                            body="We put riders and businesses to the forefront of public transportation, encouraging the idea that taking public transportation is a habit that should be rewarded and celebrated."
                        />
                        <ImageSection
                            src={imageUrls[13]}
                        />
                    </section>

                    {/* REFLECTION */}
                    <section id="reflection" className="case-study-section">
                        <TextSection
                            caption="REFLECTION"
                            heading="What TrainTrek taught me about design"
                            body="This experience taught me that product design is not just about designing an experience, but understanding how it can fit into a larger ecosystem. I was constantly challenged to consider all the possible stakeholders of the app, from commuters, to small businesses, to users with malicious intent. I had fun iterating from a city discovery app where transportation was a second thought, to a focused reward system where public transportation was at the forefront."
                        />
                        <ImageSection
                            src={imageUrls[14]}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default TrainTrekCaseStudy;
