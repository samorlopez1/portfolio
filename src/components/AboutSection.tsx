import './AboutSection.css';

export function AboutSection() {
    return (
        <section className="about-section" data-node-id="865:122">
            {/* First Row: About Text + Image */}
            <div className="about-row" data-node-id="865:123">
                <div className="about-text-wrapper" data-node-id="865:124">
                    <p className="about-title" data-node-id="865:125">
                        I see the big picture and sweat the details.
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
                <div className="about-image-wrapper" data-node-id="865:177">
                    <div className="about-image" data-node-id="865:178" />
                    <div className="about-image-links" data-node-id="865:179">
                        <p data-node-id="865:180">EMAIL</p>
                        <p data-node-id="865:181">RESUME</p>
                        <p data-node-id="865:182">LINKEDIN</p>
                    </div>
                </div>
            </div>

            {/* Second Row: Skills Section */}
            <div className="about-row about-row-left" data-node-id="865:134">
                <div className="skills-container" data-node-id="865:135">
                    {/* Headers */}
                    <div className="skills-row skills-headers" data-node-id="865:136">
                        <div className="skill-column" data-node-id="865:137">
                            <p className="skill-header" data-node-id="865:138">PRACTICES</p>
                        </div>
                        <div className="skill-column" data-node-id="865:139">
                            <p className="skill-header" data-node-id="865:140">TOOLKIT</p>
                        </div>
                        <div className="skill-column" data-node-id="865:141">
                            <p className="skill-header" data-node-id="865:142">ENJOYS</p>
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
                            <p className="skill-item" data-node-id="865:149">film photos</p>
                            <p className="skill-item">golf</p>
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
                            <p className="skill-item" data-node-id="865:156">his friends</p>
                            <p className="skill-item">new people</p>
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
                            <p className="skill-item" data-node-id="865:163">espresso lemonades</p>
                            <p className="skill-item">hamachi sashimi</p>
                        </div>
                    </div>

                    {/* Creative Coding */}
                    <div className="skills-row" data-node-id="865:164">
                        <div className="skill-column" data-node-id="865:165">
                            <p className="skill-item" data-node-id="865:166">Creative Coding</p>
                        </div>
                        <div className="skill-column" data-node-id="865:167">
                            <p className="skill-item" data-node-id="865:168">GSAP</p>
                            <p className="skill-item">P5.js</p>
                            <p className="skill-item">Three.js</p>
                        </div>
                        <div className="skill-column" data-node-id="865:169">
                            <p className="skill-item" data-node-id="865:170">the sundays</p>
                            <p className="skill-item">rougelikes</p>
                            <p className="skill-item">podcasts</p>
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
                            <p className="skill-item">Webflow</p>
                            <p className="skill-item">Firebase</p>
                        </div>
                        <div className="skill-column" data-node-id="865:176" />
                    </div>
                </div>
            </div>
        </section>
    );
}
