'use client';

import './Hero.css';
import '../P5Background/P5Background.css';
import dynamic from 'next/dynamic';
import { useRef, memo, useEffect, useState } from 'react';

const P5Background = dynamic(
    () => import('../P5Background/P5Background').then((m) => m.P5Background),
    { ssr: false }
);
const P5BackgroundLite = dynamic(
    () => import('../P5Background/P5BackgroundLite').then((m) => m.P5BackgroundLite),
    { ssr: false }
);
import gsap from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';

gsap.registerPlugin(SplitText);




function HeroComponent() {
    const heroRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const nameRef = useRef<HTMLParagraphElement>(null);
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(max-width: 499px)').matches;
    });
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 499px)');
        setIsMobile(mql.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        const frameId = requestAnimationFrame(() => setShowBackground(true));
        return () => cancelAnimationFrame(frameId);
    }, []);


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
            <div className={`p5-background ${showBackground ? 'p5-background-visible' : ''}`}>
                <div className="p5-background-overlay-top" />
                {isMobile ? <P5BackgroundLite /> : <P5Background />}
                <div className="p5-background-overlay-bottom" />
            </div>

            <div className="hero-header">
                <div className="hero-heading" ref={headingRef}>
                    <p>Thrives in fast-paced environments,</p>
                    <p>interested in AI, motion, and creative tools,</p>
                    <p>passionate for all things design.</p>
                </div>
                <p className="hero-subtitle" ref={subtitleRef}>
                    PRODUCT DESIGN INTERN @ TIKTOK
                </p>
            </div>
            <div className="hero-name-wrapper">
                <p className="hero-name" ref={nameRef}>
                    Samuel Orendain Lopez
                </p>
            </div>
        </section>
    );
}

export const Hero = memo(HeroComponent);
