'use client';

import './Navbar.css';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { scrollToHomeSection } from '@/src/lib/sectionNavigation';
import instagramPreview from '@/src/assets/instagram_phone.webp';
import tiktokPreview from '@/src/assets/wordlet_phone.webp';
import traintrekPreview from '@/src/assets/traintrek_phone.webp';
import friendsPreview from '@/src/assets/about_me_pictures/friends.webp';
import filmPreview from '@/src/assets/me.webp';
import podcastsPreview from '@/src/assets/about_me_pictures/new_people.webp';
import invisibleArchitecturePreview from '@/src/assets/play_pictures/clothing_swap_1.webp';
import happyHourPreview from '@/src/assets/play_pictures/ai_in_design.webp';
import seatacAirportPreview from '@/src/assets/play_pictures/seatac_airport.webp';

const HOME_SCROLL_THRESHOLD_RATIO = 0.9;
const DEFAULT_SCROLL_THRESHOLD = 64;
const DESKTOP_MIN_WIDTH = 769;

export function Navbar() {
    const pathname = usePathname();
    const [showNavbar, setShowNavbar] = useState(true);
    const [activePreview, setActivePreview] = useState<'work' | 'play' | 'about' | null>(null);
    const [isPreviewEnabled, setIsPreviewEnabled] = useState(false);

    const handlePreviewEnter = (preview: 'work' | 'play' | 'about') => {
        if (!isPreviewEnabled) {
            return;
        }

        setActivePreview(preview);
    };

    const handlePreviewLeave = () => {
        setActivePreview(null);
    };

    useEffect(() => {
        setShowNavbar(true);
        const updatePreviewAvailability = () => {
            const previewEnabled = window.innerWidth >= DESKTOP_MIN_WIDTH;
            setIsPreviewEnabled(previewEnabled);

            if (!previewEnabled) {
                setActivePreview(null);
            }
        };

        updatePreviewAvailability();
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const threshold = pathname === '/' && window.innerWidth >= DESKTOP_MIN_WIDTH
                ? window.innerHeight * HOME_SCROLL_THRESHOLD_RATIO
                : DEFAULT_SCROLL_THRESHOLD;

            // Always show navbar before threshold
            if (currentScrollY < threshold) {
                setShowNavbar(true);
            } else {
                // Only apply scroll hide/show logic past 80vh
                if (currentScrollY > lastScrollY) {
                    // Scrolling down - hide
                    setShowNavbar(false);
                } else if (currentScrollY < lastScrollY) {
                    // Scrolling up - show
                    setShowNavbar(true);
                }
            }
            lastScrollY = currentScrollY;
        }

        window.addEventListener("resize", updatePreviewAvailability, { passive: true });
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("resize", updatePreviewAvailability);
            window.removeEventListener("scroll", handleScroll);
        }
    }, [pathname]);

    const handleHomeClick = (e: React.MouseEvent) => {
        if (pathname !== '/') {
            // Allow navigation to home page
            return;
        }
        // Only prevent default and scroll if already on home page
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleWorkClick = (e: React.MouseEvent) => {
        if (pathname !== '/') {
            return;
        }

        e.preventDefault();
        scrollToHomeSection('work');
    };

    const handleAboutClick = (e: React.MouseEvent) => {
        if (pathname !== '/') {
            return;
        }

        e.preventDefault();
        scrollToHomeSection('about');
    };

    const renderPreviewImages = (preview: 'work' | 'play' | 'about') => {
        const imageMap = {
            work: [instagramPreview.src, tiktokPreview.src, traintrekPreview.src],
            play: [invisibleArchitecturePreview.src, happyHourPreview.src, seatacAirportPreview.src],
            about: [friendsPreview.src, filmPreview.src, podcastsPreview.src],
        } as const;

        const [firstImage, secondImage, thirdImage] = imageMap[preview];

        return (
            <div className="nav-image-wrapper" aria-hidden="true">
                <img
                    className="nav-image nav-image-1"
                    src={firstImage}
                    alt=""
                />
                <img
                    className="nav-image nav-image-2"
                    src={secondImage}
                    alt=""
                />
                <img
                    className="nav-image nav-image-3"
                    src={thirdImage}
                    alt=""
                />
            </div>
        );
    };

    const renderPreviewGroup = (
        preview: 'work' | 'play' | 'about',
        label: string,
        content: React.ReactNode,
        isImageLayer: boolean,
    ) => (
        <div
            className={`nav-preview-link-group ${isImageLayer && activePreview === preview ? 'nav-preview-active' : ''}`}
            onMouseEnter={isImageLayer ? undefined : () => handlePreviewEnter(preview)}
            onMouseLeave={isImageLayer ? undefined : handlePreviewLeave}
            onFocus={isImageLayer ? undefined : () => handlePreviewEnter(preview)}
            onBlur={isImageLayer ? undefined : handlePreviewLeave}
        >
            {isImageLayer ? (
                <div className="nav-item nav-item-placeholder" aria-hidden="true">{label}</div>
            ) : (
                content
            )}
            {isImageLayer && renderPreviewImages(preview)}
        </div>
    );

    const renderNavbarContent = (isImageLayer: boolean) => (
        <>
            <div className="navbar-left" data-node-id="854:217">
                {isImageLayer ? (
                    <div className="nav-item nav-item-placeholder" style={{ display: 'flex' }} aria-hidden="true">
                        <p>S<span className="name-hidden">AMUEL</span></p>
                        <p id="last-name">L<span className="name-hidden">OPEZ</span></p>
                    </div>
                ) : (
                    <Link href="/" onClick={handleHomeClick} className="nav-item" style={{ display: 'flex' }}>
                        <p>S<span className="name-hidden">AMUEL</span></p>
                        <p id="last-name">L<span className="name-hidden">OPEZ</span></p>
                    </Link>
                )}
            </div>
            <div className="navbar-center" data-node-id="854:221">
                <div className="navbar-right">
                    {renderPreviewGroup(
                        'work',
                        'WORK',
                        <a href="/#work" onClick={handleWorkClick} className="nav-item">WORK</a>,
                        isImageLayer,
                    )}
                </div>
                <div className="navbar-left">
                    {renderPreviewGroup(
                        'play',
                        'PLAY',
                        <Link href="/play" className="nav-item">PLAY</Link>,
                        isImageLayer,
                    )}
                </div>
            </div>
            <div className="navbar-right" data-node-id="854:223">
                {isImageLayer ? (
                    <>
                        {renderPreviewGroup('about', 'ABOUT', null, isImageLayer)}
                        <div className="nav-item nav-item-placeholder" aria-hidden="true">RESUME</div>
                    </>
                ) : (
                    <>
                        {renderPreviewGroup(
                            'about',
                            'ABOUT',
                            <a href="/#about" onClick={handleAboutClick} className="nav-item">ABOUT</a>,
                            isImageLayer,
                        )}
                        <a href="/Resume_Samuel_Lopez_2026.pdf" target="_blank" rel="noopener noreferrer" className="nav-item">RESUME</a>
                    </>
                )}
            </div>
        </>
    );

    return (
        <>
            <nav className={`navbar ${!showNavbar ? 'navbar-hidden' : ''}`} data-node-id="854:323">
                {renderNavbarContent(false)}
            </nav>
            {isPreviewEnabled && (
                <nav
                    className={`navbar navbar-image-layer ${!showNavbar ? 'navbar-hidden' : ''}`}
                    aria-hidden="true"
                >
                    {renderNavbarContent(true)}
                </nav>
            )}
        </>
    );
}

