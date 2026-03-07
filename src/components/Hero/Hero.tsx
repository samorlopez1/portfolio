import './Hero.css';
import '../P5Background/P5Background.css';
import { P5Background } from '../P5Background';
import { useRef, memo, useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';

gsap.registerPlugin(SplitText);

interface HeroProps {
    sweepCallbackRef?: React.MutableRefObject<((x: number, y: number) => void) | null>;
}



function HeroComponent({ sweepCallbackRef }: HeroProps) {
    const headingRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const nameRef = useRef<HTMLParagraphElement>(null);

    // Setup the sweep callback for P5Background
    const handleSetSweepCallback = (callback: (x: number, y: number) => void) => {
        if (sweepCallbackRef) {
            sweepCallbackRef.current = callback;
        }
    };

    // Animate hero text with gsap
    useEffect(() => {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const tl = gsap.timeline();

        // Split text animations
        const headingElements = headingRef.current?.querySelectorAll('p');
        const headingSplits = headingElements ? Array.from(headingElements).map((el) => new SplitText(el, { type: 'lines, words', mask: 'lines' })) : [];
        const subtitleSplit = new SplitText(subtitleRef.current!, { type: 'lines, words', mask: 'lines' });
        const nameSplit = new SplitText(nameRef.current!, { type: 'chars, lines' });

        // Animate name characters first
        tl.from(nameSplit.chars, {
            opacity: 0,
            yPercent: 30,
            autoAlpha: 0,
            stagger: 0.025,
            duration: 0.8,
            ease: 'power2.out',
            force3D: true,
        }, 0.2);

        // Animate heading words after name
        headingSplits.forEach((split) => {
            tl.from(split.words, {
                opacity: 0,
                yPercent: 30,
                autoAlpha: 0,
                stagger: 0.05,
                duration: 1.8,
                ease: 'power2.out',
            }, 0.5);
        });

        // Animate subtitle words after heading
        tl.from(subtitleSplit.words, {
            opacity: 0,
            yPercent: 30,
            autoAlpha: 0,
            stagger: 0.025,
            duration: 1.2,
            ease: 'power2.out',
        }, .9);

        return () => {
            headingSplits.forEach((split) => split.revert());
            subtitleSplit.revert();
            nameSplit.revert();
        };
    }, []);

    return (
        <section className="hero" id="home">
            <div className="p5-background">
                <div className="p5-background-overlay-top" />
                <P5Background setSweepCallback={handleSetSweepCallback} />
                <div className="p5-background-overlay-bottom" />
            </div>

            <div className="hero-header" data-node-id="854:226">
                <div className="hero-heading" ref={headingRef} data-node-id="854:227">
                    <p>Thrives in fast-paced environments,</p>
                    <p>interested in AI, motion, and creative tools,</p>
                    <p>passionate for all things design.</p>
                </div>
                <p className="hero-subtitle" ref={subtitleRef} data-node-id="854:228">
                    PRODUCT DESIGN INTERN @ TIKTOK
                </p>
            </div>
            <div className="hero-name-wrapper">
                <p className="hero-name" ref={nameRef} data-node-id="854:229">
                    Samuel Orendain Lopez
                </p>
            </div>
        </section>
    );
}

export const Hero = memo(HeroComponent);
