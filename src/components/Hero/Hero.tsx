'use client';

import './Hero.css';
import '../P5Background/P5Background.css';
import { P5Background, P5BackgroundLite } from '../P5Background';
import { useRef, memo, useEffect, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';

gsap.registerPlugin(SplitText);

interface HeroProps {
    sweepCallbackRef?: React.MutableRefObject<((x: number, y: number) => void) | null>;
}



function HeroComponent({ sweepCallbackRef }: HeroProps) {
    const heroRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const nameRef = useRef<HTMLParagraphElement>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 499px)');
        setIsMobile(mql.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

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

    // Fade out + shift hero up 40px as the case-studies section scrolls up to cover it.
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        let rafId = 0;

        const update = () => {
            rafId = 0;
            if (window.innerWidth < 768) {
                hero.style.opacity = '1';
                hero.style.transform = '';
                return;
            }
            const fadeDistance = window.innerHeight;
            const linear = Math.min(Math.max(window.scrollY / fadeDistance, 0), 1);
            const progress = linear * linear; // ease-in curve
            const opacity = 1 - progress;
            const translateY = -progress * 40;
            const scale = 1 - progress * 0.03;
            hero.style.opacity = String(opacity);
            hero.style.transform = `translateY(${translateY}px) scale(${scale})`;
            hero.style.transformOrigin = 'center center';
        };

        const onScroll = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <section className="hero" id="home" ref={heroRef}>
            <div className="p5-background">
                <div className="p5-background-overlay-top" />
                {isMobile === null ? null : isMobile ? <P5BackgroundLite /> : <P5Background setSweepCallback={handleSetSweepCallback} />}
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
