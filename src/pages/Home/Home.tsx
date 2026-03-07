import { Hero } from '../../components/Hero';
import { CaseStudies } from '../../components/CaseStudies';
import { AboutSection } from '../../components/AboutSection';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './Home.css';

export function HomePage() {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo) {
            setTimeout(() => {
                const element = document.getElementById(location.state.scrollTo);
                if (element) {
                    const offset = location.state?.offset || 64;
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
    }, [location]);

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