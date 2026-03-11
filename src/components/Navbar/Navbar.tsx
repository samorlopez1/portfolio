'use client';

import './Navbar.css';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';


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
            const threshold = window.innerHeight;

            // Always show navbar before 80vh
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
    }, []);

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
                <a href="/Resume_Samuel_Lopez.pdf" target="_blank" rel="noopener noreferrer" className="nav-item">RESUME</a>
            </div>
        </nav>
    );
}

