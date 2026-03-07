import './Footer.css';
import { ThreeJsHero } from '../ThreeJsHero';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import resumePdf from '../../assets/Resume_Samuel_Lopez.pdf';


export function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleHomeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePlayClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/play');
    };

    const handleWorkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const element = document.getElementById('work');
            if (element) {
                const offsetPosition = element.getBoundingClientRect().top + window.scrollY + 64;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        } else {
            navigate('/', { state: { scrollTo: 'work', offset: 64 } });
        }
    };

    const handleAboutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const element = document.getElementById('about');
            if (element) {
                const offsetPosition = element.getBoundingClientRect().top + window.scrollY + 64;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        } else {
            navigate('/', { state: { scrollTo: 'about', offset: 64 } });
        }
    };

    return (
        <footer className="footer" data-node-id="854:347">
            {/* Footer Top */}
            <div className="footer-top" data-node-id="854:303">
                <div className="footer-content" data-node-id="854:304">
                    {/* contact Info */}
                    <div className="footer-row">
                        <div className="footer-column" data-node-id="854:305">
                            <p className="footer-title" data-node-id="854:306">
                                Contact
                            </p>
                        </div>
                    </div>

                    <div className="footer-row">
                        {/* contact */}
                        <div className="footer-column" data-node-id="854:311">
                            <div className="footer-subtitle" data-node-id="854:310">
                                <a href="mailto:samorlopez.work@gmail.com">SAMORLOPEZ.WORK@GMAIL.COM</a>
                                <a href={resumePdf} target="_blank" rel="noopener noreferrer">RESUME</a>
                                <a href="https://linkedin.com/in/samorlopez" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-content" data-node-id="854:304">
                    {/* navigate Info */}
                    <div className="footer-row">
                        <div className="footer-column" data-node-id="854:305">
                            <p className="footer-title" data-node-id="854:306">
                                Navigate
                            </p>
                        </div>
                    </div>

                    <div className="footer-row">
                        {/* nav */}
                        <div className="footer-column" data-node-id="854:311">
                            <div className="footer-subtitle" data-node-id="854:310">
                                <a href="/" onClick={handleHomeClick} >HOME</a>
                                <a href="#work" onClick={handleWorkClick}>WORK</a>
                                <a href="/play" onClick={handlePlayClick}>PLAYGROUND</a>
                                <a href="#about" onClick={handleAboutClick}>ABOUT</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-filter"></div>

            {/* Footer Bottom */}
            <div className="footer-bottom" data-node-id="854:317">
                <div className="footer-bottom-background" data-node-id="854:317">
                    <ThreeJsHero />
                </div>
                <div className="footer-bottom-content">
                    <div>
                        <p className="footer-subtitle">© SL 2026</p>
                    </div>
                    <div>
                        <p className="footer-subtitle">BUILT WITH REACT</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
