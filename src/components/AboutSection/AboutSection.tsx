'use client';

import { useState } from 'react';
import './AboutSection.css';
import meImage from '../../assets/me.webp';
import resumePdf from '../../assets/Resume_Samuel_Lopez.pdf';

// Import your default skill image and specific skill images here
import defaultSkillImage from '../../assets/about_me_pictures/default.png';
import myFriendsImage from '../../assets/about_me_pictures/friends.jpg';
import filmImage from '../../assets/about_me_pictures/film.webp';
import newPeople from '../../assets/about_me_pictures/new_people.webp';
import golf from '../../assets/about_me_pictures/golf.mp4';
import theSundays from '../../assets/about_me_pictures/the_sundays.png';
import rougelikes from '../../assets/about_me_pictures/rougelikes.png';
import podcasts from '../../assets/about_me_pictures/podcasts.png';

const DEFAULT_SKILL_IMAGE = defaultSkillImage; // Replace with your default image

// Helper function to check if a file is a video
const isVideoFile = (filePath: string): boolean => {
    return filePath.endsWith('.mp4') || filePath.endsWith('.webm') || filePath.endsWith('.mov');
};

const skillImageMap: Record<string, string> = {
    'film photos': filmImage, // Replace with actual image
    'golf': golf, // Replace with actual image
    'his friends': myFriendsImage, // Replace with actual image
    'new people': newPeople, // Replace with actual image
    'the sundays': theSundays, // Replace with actual image
    'rougelikes': rougelikes, // Replace with actual image
    'podcasts': podcasts, // Replace with actual image
};

export function AboutSection() {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    return (
        <section className="about-section" id="about">
            {/* First Row: About Text + Image */}
            <div className="about-row" data-node-id="865:123">
                <div className="about-text-wrapper" data-node-id="865:124">
                    <p className="about-title" data-node-id="865:125">
                        Sees the big picture and sweats the details.
                    </p>
                    <div className="about-description" data-node-id="865:126">
                        <p>
                            I believe that the power of design is not only its ability to appeal visually, but for its role in shaping the systems and societies we live in.
                        </p>
                        <p>
                            Strives to constantly improve, and to make meaningful impacts on the world.
                        </p>
                    </div>
                </div>
                <div className="about-image-wrapper">
                    <img src={meImage} alt="About me" className="about-image" />
                    <div className="about-image-links">
                        <a href="mailto:samorlopez.work@gmail.com">EMAIL</a>
                        <a href={resumePdf} target="_blank" rel="noopener noreferrer">RESUME</a>
                        <a href="https://linkedin.com/in/samorlopez" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                    </div>
                </div>
            </div>

            {/* Second Row: Skills Section */}
            <div className="about-row">
                <div className="skills-container">
                    {/* Headers */}
                    <div className="skills-row skills-headers">
                        <div className="skill-column">
                            <p className="skill-header">PRACTICES</p>
                        </div>
                        <div className="skill-column">
                            <p className="skill-header">TOOLKIT</p>
                        </div>
                        <div className="skill-column">
                            <p className="skill-header">ENJOYS</p>
                        </div>
                    </div>

                    {/* UI / UX Design */}
                    <div className="skills-row" data-node-id="865:143">
                        <div className="skill-column" data-node-id="865:144">
                            <p className="skill-item" data-node-id="865:145">UI / UX Design</p>
                        </div>
                        <div className="skill-column" data-node-id="865:146">
                            <p className="skill-item" data-node-id="865:147">Figma</p>
                            <p className="skill-item">Lovable</p>
                        </div>
                        <div className="skill-column" data-node-id="865:148">
                            <p
                                className="skill-item ul"
                                data-node-id="865:149"
                                onMouseEnter={() => setHoveredSkill('film photos')}
                            >
                                film photos
                            </p>
                            <p
                                className="skill-item ul"
                                onMouseEnter={() => setHoveredSkill('golf')}
                            >
                                golf
                            </p>
                        </div>
                    </div>

                    {/* Graphic Design */}
                    <div className="skills-row" data-node-id="865:150">
                        <div className="skill-column" data-node-id="865:151">
                            <p className="skill-item" data-node-id="865:152">Graphic Design</p>
                        </div>
                        <div className="skill-column" data-node-id="865:153">
                            <p className="skill-item" data-node-id="865:154">Photoshop</p>
                            <p className="skill-item">Illustrator</p>
                        </div>
                        <div className="skill-column" data-node-id="865:155">
                            <p
                                className="skill-item ul"
                                data-node-id="865:156"
                                onMouseEnter={() => setHoveredSkill('his friends')}
                            >
                                his friends
                            </p>
                            <p
                                className="skill-item ul"
                                onMouseEnter={() => setHoveredSkill('new people')}
                            >
                                new people
                            </p>
                        </div>
                    </div>

                    {/* Motion Design */}
                    <div className="skills-row" data-node-id="865:157">
                        <div className="skill-column" data-node-id="865:158">
                            <p className="skill-item" data-node-id="865:159">Motion Design</p>
                        </div>
                        <div className="skill-column" data-node-id="865:160">
                            <p className="skill-item" data-node-id="865:161">After Effects</p>
                            <p className="skill-item">Jitter</p>
                        </div>
                        <div className="skill-column" data-node-id="865:162">
                            <p
                                className="skill-item"
                                data-node-id="865:163"
                            //onMouseEnter={() => setHoveredSkill('espresso lemonades')}
                            >
                                espresso lemonades
                            </p>
                            <p
                                className="skill-item"
                            //onMouseEnter={() => setHoveredSkill('hamachi sashimi')}
                            >
                                hamachi sashimi
                            </p>
                        </div>
                    </div>

                    {/* Web Development */}
                    <div className="skills-row" data-node-id="865:171">
                        <div className="skill-column" data-node-id="865:172">
                            <p className="skill-item" data-node-id="865:173">Web Development</p>
                        </div>
                        <div className="skill-column" data-node-id="865:174">
                            <p className="skill-item" data-node-id="865:175">Javascript</p>
                            <p className="skill-item">React</p>
                            <p className="skill-item">Cursor</p>
                        </div>
                        <div className="skill-column" data-node-id="865:169">
                            <p
                                className="skill-item ul"
                                onMouseEnter={() => setHoveredSkill('the sundays')}
                            >
                                the sundays
                            </p>
                            <p
                                className="skill-item ul"
                                onMouseEnter={() => setHoveredSkill('rougelikes')}
                            >
                                rougelikes
                            </p>
                            <p
                                className="skill-item ul"
                                onMouseEnter={() => setHoveredSkill('podcasts')}
                            >
                                podcasts
                            </p>
                        </div>
                    </div>

                    {/* Creativity */}
                    <div className="skills-row" data-node-id="865:171">
                        <div className="skill-column" data-node-id="865:172">
                            <p className="skill-item" data-node-id="865:173">Creativity</p>
                        </div>
                        <div className="skill-column">
                            <p className="skill-item">blender</p>
                            <p className="skill-item">a 3d printer</p>
                            <p className="skill-item">oil paints</p>
                            <p className="skill-item">his kitchen</p>
                        </div>
                        <div className="skill-column" />
                    </div>
                </div>

                <div className="about-image-wrapper skills-image">
                    {isVideoFile(hoveredSkill ? skillImageMap[hoveredSkill] : DEFAULT_SKILL_IMAGE) ? (
                        <video
                            src={hoveredSkill ? skillImageMap[hoveredSkill] : DEFAULT_SKILL_IMAGE}
                            className="about-image"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    ) : (
                        <img
                            src={hoveredSkill ? skillImageMap[hoveredSkill] : DEFAULT_SKILL_IMAGE}
                            alt={hoveredSkill || 'Skills'}
                            className="about-image"
                        />
                    )}
                </div>

            </div>
        </section>
    );
}
