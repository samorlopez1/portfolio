import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import resumePdf from '../../assets/Resume_Samuel_Lopez.pdf';

export function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showNavbar, setShowNavbar] = useState(true);

    const handlePlayHover = () => {
        // Preload Gallery component on hover
        import('../../pages/Gallery/Gallery');
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
        <nav className={`navbar ${!showNavbar ? 'navbar-hidden' : ''}`} data-node-id="854:323">
            <div className="navbar-left" data-node-id="854:217">
                <a href="/" onClick={handleHomeClick} className="nav-item" style={{ display: 'flex' }}>
                    <p>S<span className="name-hidden">AMUEL</span></p>
                    <p id="last-name">L<span className="name-hidden">OPEZ</span></p>
                </a>
            </div>
            <div className="navbar-center" data-node-id="854:221">
                <div className="navbar-right">
                    <a href="#work" onClick={handleWorkClick} className="nav-item">WORK</a>
                </div>
                <div className="navbar-left">
                    <a href="/play" onClick={handlePlayClick} onMouseEnter={handlePlayHover} className="nav-item">PLAY</a>
                </div>
            </div>
            <div className="navbar-right" data-node-id="854:223">
                <a href="#about" onClick={handleAboutClick} className="nav-item">ABOUT</a>
                <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="nav-item">RESUME</a>
            </div>
        </nav>
    );
}

