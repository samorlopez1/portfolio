import { Hero } from '@/src/components/Hero';
import { CaseStudies } from '@/src/components/CaseStudies';
import { AboutSection } from '@/src/components/AboutSection';
import { FadeSection } from '@/src/components/FadeSection/FadeSection';
import '@/src/page-components/Home/Home.css';

export default function Home() {
    return (
        <div className="home-page-wrapper">
            <div className="home-page">
                <Hero />
                <FadeSection />
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
