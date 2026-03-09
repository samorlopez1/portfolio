'use client';

import { Hero } from '../../components/Hero';
import { CaseStudies } from '../../components/CaseStudies';
import { AboutSection } from '../../components/AboutSection';
import { useEffect } from 'react';
import './Home.css';

export function HomePage() {
    useEffect(() => {
        // Check if there's a hash in the URL for scrolling to a section
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash.substring(1));
                if (element) {
                    const offset = 64;
                    const offsetPosition =
                        element.getBoundingClientRect().top +
                        window.scrollY +
                        offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                    });
                }
            }, 100);
        }
    }, []);

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