import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { CaseStudies } from './CaseStudy';
import { AboutSection } from './AboutSection';
import { Footer } from './Footer';
import './HomePage.css';

export function HomePage() {
    return (
        <div className="home-page-wrapper">
            <div className="home-page" data-node-id="854:215">
                <Navbar />
                <Hero />
                <CaseStudies />
                <AboutSection />
                <Footer />
            </div>
        </div>
    );
}
