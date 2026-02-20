import './Navbar.css';
import React, { useEffect, useState } from "react";

export function Navbar() {
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowNavbar(currentScrollY < lastScrollY);
            lastScrollY = currentScrollY;
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className={`navbar ${!showNavbar ? 'navbar-hidden' : ''}`} data-node-id="854:323">
            <div className="navbar-left" data-node-id="854:217">
                <a href="#" onClick={scrollToTop} className="nav-item">HOME</a>
            </div>
            <div className="navbar-center" data-node-id="854:221">
                <div className="navbar-right">
                    <a href="#work" className="nav-item">WORK</a>
                </div>
                <div className="navbar-left">
                    <p className="nav-item">PLAY</p>
                </div>
            </div>
            <div className="navbar-right" data-node-id="854:223">
                <a href="#about" className="nav-item">ABOUT</a>
                <a href="#resume" className="nav-item">RESUME</a>
            </div>
        </nav>
    );
}
