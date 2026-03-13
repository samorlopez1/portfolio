'use client';

import './Navbar.css';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { scrollToHomeSection } from '@/src/lib/sectionNavigation';

const HOME_SCROLL_THRESHOLD_RATIO = 0.9;
const DEFAULT_SCROLL_THRESHOLD = 64;
const DESKTOP_MIN_WIDTH = 769;

export function Navbar() {
    const pathname = usePathname();
    const [showNavbar, setShowNavbar] = useState(true);

    const handlePlayHover = () => {
        // Preload Gallery component on hover
        // Next.js handles this automatically with link prefetching
    };

    useEffect(() => {
        setShowNavbar(true);
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

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
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

    return (
        <nav className={`navbar ${!showNavbar ? 'navbar-hidden' : ''}`} data-node-id="854:323">
            <div className="navbar-left" data-node-id="854:217">
                <Link href="/" onClick={handleHomeClick} className="nav-item" style={{ display: 'flex' }}>
                    <p>S<span className="name-hidden">AMUEL</span></p>
                    <p id="last-name">L<span className="name-hidden">OPEZ</span></p>
                </Link>
            </div>
            <div className="navbar-center" data-node-id="854:221">
                <div className="navbar-right">
                    <a href="/#work" onClick={handleWorkClick} className="nav-item">WORK</a>
                </div>
                <div className="navbar-left">
                    <Link href="/play" onMouseEnter={handlePlayHover} className="nav-item">PLAY</Link>
                </div>
            </div>
            <div className="navbar-right" data-node-id="854:223">
                <a href="/#about" onClick={handleAboutClick} className="nav-item">ABOUT</a>
                <a href="/Resume_Samuel_Lopez_2026.pdf" target="_blank" rel="noopener noreferrer" className="nav-item">RESUME</a>
            </div>
        </nav>
    );
}

