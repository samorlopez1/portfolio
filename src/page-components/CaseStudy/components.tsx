'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Lottie from 'lottie-react';
import type { StaticImageData } from 'next/image';

interface TextSectionProps {
    caption?: string;
    heading?: string;
    body?: string;
    body2?: string;
    children?: React.ReactNode;
}

export const TextSection: React.FC<TextSectionProps> = ({ caption, heading, body, body2, children }) => {
    return (
        <div className="text-section">
            {caption && <p className="caption">{caption}</p>}
            {heading && <h2 className="text-section-heading">{heading}</h2>}
            {body && <p className="body">{body}</p>}
            {body2 && <p className="body">{body2}</p>}
            {children}
        </div>
    );
};

interface ImageSectionProps {
    src: string | StaticImageData;
    src2?: string | StaticImageData;
    alt?: string;
    header?: string;
    caption?: string;
}

const ImageContent: React.FC<{ src: string | StaticImageData; alt: string }> = ({ src, alt }) => {
    const isStaticImage = typeof src !== 'string';
    return isStaticImage ? (
        <Image
            src={src as StaticImageData}
            alt={alt}
            width={(src as StaticImageData).width}
            height={(src as StaticImageData).height}
            sizes="(max-width: 1080px) 100vw, 67vw"
        />
    ) : (
        <img src={src as string} alt={alt} loading="lazy" />
    );
};

export const ImageSection: React.FC<ImageSectionProps> = ({ src, src2, alt = '', caption, header }) => {
    return (
        <div className="image-section">
            <div className="image-container">
                <ImageContent src={src} alt={alt} />
            </div>
            {src2 && (
                <div className="image-container">
                    <ImageContent src={src2} alt={alt} />
                </div>
            )}
            <div className="text-content">
                {header && <p className="image-header">{header}</p>}
                {caption && <p className="caption">{caption}</p>}
            </div>
        </div>
    );
};

interface LottieSectionProps {
    src: any;
    src2?: any;
    image?: string | StaticImageData;
    header?: string;
    caption?: string;
}

const useLottieData = (src: any) => {
    const [animationData, setAnimationData] = React.useState<any>(!src ? null : typeof src === 'string' ? null : src);

    React.useEffect(() => {
        if (!src) return;
        let isMounted = true;

        const loadAnimation = async () => {
            if (typeof src !== 'string') {
                setAnimationData(src);
                return;
            }

            try {
                const response = await fetch(src);
                if (!response.ok) {
                    throw new Error(`Failed to load animation: ${response.status}`);
                }
                const json = await response.json();
                if (isMounted) {
                    setAnimationData(json);
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadAnimation();

        return () => {
            isMounted = false;
        };
    }, [src]);

    return animationData;
};

export const LottieSection: React.FC<LottieSectionProps> = ({ src, src2, image, caption, header }) => {
    const animationData = useLottieData(src);
    const animationData2 = useLottieData(src2);

    return (
        <div className="image-section">
            <div className="image-container">
                {animationData ? <Lottie animationData={animationData} loop autoplay /> : null}
            </div>
            {src2 && (
                <div className="image-container">
                    {animationData2 ? <Lottie animationData={animationData2} loop autoplay /> : null}
                </div>
            )}
            {image && (
                <div className="image-container">
                    <ImageContent src={image} alt="" />
                </div>
            )}
            <div className="text-content">
                {header && <p className="image-header">{header}</p>}
                {caption && <p className="caption">{caption}</p>}
            </div>
        </div>
    );
};

interface VideoSectionProps {
    src: string;
    src2?: string;
    caption?: string;
    header?: string;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ src, src2, caption, header }) => {
    return (
        <div className="video-section">
            <div className="video-container">
                <video autoPlay loop muted playsInline>
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            {src2 && (
                <div className="video-container">
                    <video autoPlay loop muted playsInline>
                        <source src={src2} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            <div className="text-content">
                {header && <p className="image-header">{header}</p>}
                {caption && <p className="caption">{caption}</p>}
            </div>
        </div>
    );
};

interface MetadataItem {
    label: string;
    items: string[];
}

interface TextContentWithMetadataProps {
    caption?: string;
    body?: string;
    metadata: MetadataItem[];
}

export const TextContentWithMetadata: React.FC<TextContentWithMetadataProps> = ({ metadata }) => {
    return (
        <div className="text-content-with-metadata">
            <div className="metadata-grid">
                {metadata.map((item, index) => (
                    <div key={index} className="metadata-column">
                        <p className="metadata-label">{item.label}</p>
                        {item.items.map((i, idx) => (
                            <p key={idx} className="metadata-item">{i}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

interface CaseStudyHeroProps {
    image: string | StaticImageData;
    coverImage?: string | StaticImageData;
}

const isVideo = (src: string | StaticImageData) => {
    const srcStr = typeof src === 'string' ? src : src.src;
    return /\.(mp4|webm|ogg|mov)([?#].*)?$/i.test(srcStr);
};

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ image, coverImage }) => {
    const imageSrc = typeof image === 'string' ? image : image.src;
    const isStaticImage = typeof image !== 'string';
    const [isVideoReady, setIsVideoReady] = React.useState(false);

    React.useEffect(() => {
        setIsVideoReady(false);
    }, [imageSrc]);

    const coverSrc = coverImage
        ? typeof coverImage === 'string'
            ? coverImage
            : coverImage.src
        : undefined;

    const isVideoHero = isVideo(image);

    return (
        <section className="case-study-hero">
            {isVideoHero ? (
                <>
                    <video
                        src={imageSrc}
                        className="case-study-hero-image"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onLoadedData={() => setIsVideoReady(true)}
                    />
                    <div className={`case-study-hero-cover ${isVideoReady ? 'is-hidden' : ''}`} aria-hidden="true">
                        {coverSrc ? (
                            <img src={coverSrc} alt="" className="case-study-hero-cover-image" loading="eager" />
                        ) : (
                            <div className="case-study-hero-cover-placeholder" />
                        )}
                    </div>
                </>
            ) : (
                isStaticImage ? (
                    <Image
                        src={image as StaticImageData}
                        alt=""
                        className="case-study-hero-image"
                        priority
                        sizes="100vw"
                    />
                ) : (
                    <img src={imageSrc} alt="" className="case-study-hero-image" loading="eager" />
                )
            )}
        </section>
    );
};

interface SidebarLink {
    id: string;
    label: string;
}

interface CaseStudySidebarProps {
    projectHeader: string;
    projectType?: string;
    projectUrl?: string;
    projectUrlLabel?: string;
    links: SidebarLink[];
    activeSection?: string;
    onSectionClick?: (id: string) => void;
}

export const CaseStudySidebar: React.FC<CaseStudySidebarProps> = ({
    projectHeader,
    projectType,
    projectUrl,
    projectUrlLabel,
    links,
    activeSection,
    onSectionClick,
}) => {
    return (
        <aside className="case-study-sidebar">
            <div className="sidebar-top">
                <div>
                    <p className="sidebar-title">{projectHeader}</p>
                    <p className="sidebar-subtitle">{projectType}</p>
                </div>
                {projectUrl && projectUrlLabel && (
                    <a href={projectUrl} className="sidebar-link" target="_blank" rel="noopener noreferrer">
                        {projectUrlLabel}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="sidebar-link-icon">
                            <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
                        </svg>
                    </a>
                )}
            </div>

            <nav className="sidebar-bottom">
                {links.map((link) => (
                    <a
                        key={link.id}
                        href={`#${link.id}`}
                        className={`sidebar-section-link ${activeSection === link.id ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            onSectionClick?.(link.id);
                            const target = link.id === 'context'
                                ? document.getElementById('case-study-content-top')
                                : document.getElementById(link.id);
                            target?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        {link.label}
                    </a>
                ))}
                <Link href="/" className="sidebar-back-button">BACK</Link>
            </nav>

        </aside>
    );
};

interface CaseStudyNavbarProps {
    logo?: string;
    links: Array<{
        label: string;
        href: string;
    }>;
}

export const CaseStudyNavbar: React.FC<CaseStudyNavbarProps> = ({ logo = 'PORTFOLIO', links }) => {
    return (
        <nav className="case-study-navbar">
            <span className="navbar-logo">{logo}</span>
            <ul className="navbar-menu">
                {links.map((link, index) => (
                    <li key={index}>
                        <a href={link.href} className="navbar-menu-item">{link.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
