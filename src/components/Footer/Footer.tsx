'use client';

import './Footer.css';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ThreeJsHero } from '../ThreeJsHero';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { scrollToHomeSection } from '@/src/lib/sectionNavigation';


export function Footer() {
    const [isVisible, setIsVisible] = useState(false);
    const emailAddress = 'samorlopez.work@gmail.com';
    const copiedBadgeRef = useRef<HTMLSpanElement | null>(null);
    const copiedResetTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const reveal = () => {
            window.setTimeout(() => setIsVisible(true), 1200);
        };

        if (document.readyState === 'complete') {
            reveal();
            return;
        }

        window.addEventListener('load', reveal);
        return () => window.removeEventListener('load', reveal);
    }, []);

    useEffect(() => {
        return () => {
            if (copiedResetTimeoutRef.current !== null) {
                window.clearTimeout(copiedResetTimeoutRef.current);
            }
        };
    }, []);

    const pathname = usePathname();

    const copyEmailWithFallback = () => {
        const textarea = document.createElement('textarea');
        textarea.value = emailAddress;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    };

    const animateCopiedBadge = () => {
        const badge = copiedBadgeRef.current;

        if (!badge) {
            return;
        }

        if (copiedResetTimeoutRef.current !== null) {
            window.clearTimeout(copiedResetTimeoutRef.current);
        }

        gsap.killTweensOf(badge);
        gsap.set(badge, { y: 10, autoAlpha: 0 });
        gsap.to(badge, {
            y: 0,
            autoAlpha: 1,
            duration: 0.24,
            ease: 'power2.out',
        });

        copiedResetTimeoutRef.current = window.setTimeout(() => {
            gsap.to(badge, {
                y: -10,
                autoAlpha: 0,
                duration: 0.2,
                ease: 'power2.in',
            });
        }, 1400);
    };

    const handleHomeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePlayClick = (e: React.MouseEvent) => {
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

    const handleEmailCopy = async () => {
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(emailAddress);
            } else {
                copyEmailWithFallback();
            }
            animateCopiedBadge();
        } catch {
            copyEmailWithFallback();
            animateCopiedBadge();
        }
    };

    return (
        <footer className={`footer ${isVisible ? 'visible' : ''}`}>
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
                                <div className="footer-copy-row">
                                    <button
                                        type="button"
                                        className="footer-copy-button"
                                        onClick={handleEmailCopy}
                                        aria-label="Copy email address to clipboard"
                                    >
                                        SAMORLOPEZ.WORK@GMAIL.COM
                                    </button>
                                    <span ref={copiedBadgeRef} className="footer-copy-feedback" aria-live="polite">
                                        COPIED!
                                    </span>
                                </div>
                                <a href="/Resume_Samuel_Lopez_2026.pdf" target="_blank" rel="noopener noreferrer">RESUME</a>
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
                                <Link href="/" onClick={handleHomeClick}>HOME</Link>
                                <a href="/#work" onClick={handleWorkClick}>WORK</a>
                                <Link href="/play" onClick={handlePlayClick}>PLAYGROUND</Link>
                                <a href="/#about" onClick={handleAboutClick}>ABOUT</a>
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
                        <p className="footer-subtitle">BUILT WITH NEXT.JS</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
