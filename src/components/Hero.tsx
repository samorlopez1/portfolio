import './Hero.css';
import './P5Background.css';
import { P5Background } from './P5Background';
import { ThreeJsHero } from './ThreeJsHero';

export function Hero() {
    return (
        <section className="hero" id="home">
            <div className="p5-background">
                <div className="p5-background-overlay-top" />
                <P5Background />
                <div className="p5-background-overlay-bottom" />
            </div>

            <div className="hero-header" data-node-id="854:226">
                <div className="hero-heading" data-node-id="854:227">
                    <p>Thrives in fast-paced environments,</p>
                    <p>interested in AI, motion, and creative tools,</p>
                    <p>passionate for all things design.</p>
                </div>
                <p className="hero-subtitle" data-node-id="854:228">
                    PRODUCT DESIGN INTERN @ TIKTOK
                </p>
            </div>
            <div className="hero-name-wrapper">
                <p className="hero-name" data-node-id="854:229">
                    Samuel Orendain Lopez
                </p>
            </div>
        </section>
    );
}
