'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import './CaseStudies.css';
import { caseStudiesData } from '../../data/caseStudies';
import LottiePlayer from 'react-lottie-player';
import type { StaticImageData } from 'next/image';

interface CaseStudyProps {
    thumbnail?: string | object | StaticImageData;
    caption?: string;
    posterImage?: string | StaticImageData;
    route?: string;
}

export function CaseStudyWrapper({ thumbnail, caption, date, posterImage, route }: CaseStudyProps & { date?: string }) {
    const [isHovering, setIsHovering] = useState(false);
    const [isTextFlipped, setIsTextFlipped] = useState(false);
    const [isCentered, setIsCentered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const visibilityRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Handle window resize to detect mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        // Set initial value on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle mobile center detection with Intersection Observer
    useEffect(() => {
        if (!isMobile || !wrapperRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Check if element is in the center 33% of viewport
                        const rect = entry.boundingClientRect;
                        const viewportCenter = window.innerHeight / 2;
                        const elementCenter = rect.top + rect.height / 2;
                        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
                        const threshold = window.innerHeight * 0.165; // 16.5% above and below center (center 33%)

                        setIsCentered(distanceFromCenter < threshold);
                    } else {
                        setIsCentered(false);
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        observer.observe(wrapperRef.current);
        return () => observer.disconnect();
    }, [isMobile]);

    // Handle scroll to continuously check center position on mobile
    useEffect(() => {
        if (!isMobile || !wrapperRef.current) return;

        const handleScroll = () => {
            const rect = wrapperRef.current?.getBoundingClientRect();
            if (!rect) return;

            const viewportCenter = window.innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
            const threshold = window.innerHeight * 0.165; // 16.5% above and below center (center 33%)

            setIsCentered(distanceFromCenter < threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    // Handle mobile video and lottie playback when centered
    useEffect(() => {
        if (isMobile && isCentered) {
            if (videoRef.current) {
                videoRef.current.play();
            }
        } else if (isMobile && !isCentered) {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
    }, [isMobile, isCentered]);

    const handleMouseEnter = () => {
        if (isMobile) return; // Disable hover on mobile
        setIsHovering(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
        // Check visibility once on hover
        if (visibilityRef.current) {
            const rect = visibilityRef.current.getBoundingClientRect();
            const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
            setIsTextFlipped(!isVisible);
        }
    };

    const handleMouseLeave = () => {
        if (isMobile) return; // Disable hover on mobile
        setIsHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const content = (
        <div
            ref={wrapperRef}
            className={`case-study-wrapper ${isTextFlipped ? 'text-flipped' : ''} ${isMobile && isCentered ? 'mobile-centered' : ''} ${route ? 'clickable' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="case-study-thumbnail" data-node-id="854:232">
                {thumbnail ? (
                    typeof thumbnail === 'string' && thumbnail.includes('.mp4') ? (
                        <video
                            ref={videoRef}
                            src={thumbnail}
                            loop
                            muted
                            playsInline
                            poster={typeof thumbnail === 'string' && thumbnail.includes('.mp4') ? (typeof posterImage === 'string' ? posterImage : posterImage?.src) : undefined}
                            className="case-study-video"
                        />
                    ) : typeof thumbnail === 'object' && 'src' in thumbnail ? (
                        <img src={(thumbnail as StaticImageData).src} alt={caption || 'Case study'} />
                    ) : typeof thumbnail === 'object' ? (
                        <LottiePlayer className="case-study-lottie" loop animationData={thumbnail} play={isHovering || (isMobile && isCentered)} />
                    ) : (
                        <img src={thumbnail} alt={caption || 'Case study'} />
                    )
                ) : (
                    <div className="placeholder" />
                )}
            </div>

            <div className="case-study-text">
                <div className="case-study-tag-wrapper">
                    <p className="case-study-date">
                        {date || '2026'}
                    </p>
                    <div className="case-study-corner">
                        <img src="/tag-corner.svg" alt="corner" />
                    </div>
                </div>
                <p className="case-study-caption">
                    {caption || 'This is a caption'}
                </p>
            </div>
            <div className="case-study-text-visibility" ref={visibilityRef} />
        </div>
    );

    if (route) {
        return (
            <Link href={route} className="case-study-link">
                {content}
            </Link>
        );
    }

    return content;
}

export function CaseStudies() {
    return (
        <section className="case-studies" id="work">
            {caseStudiesData.map((caseStudy) => (
                <CaseStudyWrapper
                    key={caseStudy.id}
                    caption={caseStudy.caption}
                    thumbnail={caseStudy.thumbnail}
                    date={caseStudy.date}
                    posterImage={caseStudy.posterImage}
                    route={caseStudy.route}
                />
            ))}
        </section>
    );
}
