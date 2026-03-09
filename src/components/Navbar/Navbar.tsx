'use client';

import './Navbar.css';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import resumePdf from '../../assets/Resume_Samuel_Lopez.pdf';

export function Navbar() {
    const pathname = usePathname();
    const [showNavbar, setShowNavbar] = useState(true);

    const handlePlayHover = () => {
        // Preload Gallery component on hover
        // Next.js handles this automatically with link prefetching
    };

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Always show navbar at the top of the page, disable hide logic entirely
            if (currentScrollY < 50) {
                setShowNavbar(true);
            } else {
                // Only apply scroll hide/show logic when past 50px
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
    }, []);

    const handleHomeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePlayClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleWorkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (pathname === '/') {
            const element = document.getElementById('work');
            if (element) {
                const offsetPosition = element.getBoundingClientRect().top + window.scrollY + 64;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        } else {
            // Navigate to home and let the page handle scrolling
            window.location.href = '/#work';
        }
    };

    const handleAboutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (pathname === '/') {
            const element = document.getElementById('about');
            if (element) {
                const offsetPosition = element.getBoundingClientRect().top + window.scrollY + 64;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        } else {
            // Navigate to home and let the page handle scrolling
            window.location.href = '/#about';
        }
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
                    <a href="#work" onClick={handleWorkClick} className="nav-item">WORK</a>
                </div>
                <div className="navbar-left">
                    <Link href="/play" onMouseEnter={handlePlayHover} className="nav-item">PLAY</Link>
                </div>
            </div>
            <div className="navbar-right" data-node-id="854:223">
                <a href="#about" onClick={handleAboutClick} className="nav-item">ABOUT</a>
                <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="nav-item">RESUME</a>
            </div>
        </nav>
    );
}

