import React from 'react';
import Lottie from 'lottie-react';

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
    src: string;
    alt?: string;
    header?: string;
    caption?: string;
}

export const ImageSection: React.FC<ImageSectionProps> = ({ src, alt = '', caption, header }) => {
    return (
        <div className="image-section">
            <div className="image-container">
                <img src={src} alt={alt} />
            </div>
            {header && <p className="image-header">{header}</p>}
            {caption && <p className="caption">{caption}</p>}
        </div>
    );
};

interface LottieSectionProps {
    src: any;
    header?: string;
    caption?: string;
}

export const LottieSection: React.FC<LottieSectionProps> = ({ src, caption, header }) => {
    return (
        <div className="image-section">
            <div className="image-container">
                <Lottie animationData={src} loop autoplay />
            </div>
            {header && <p className="image-header">{header}</p>}
            {caption && <p className="caption">{caption}</p>}
        </div>
    );
};

interface VideoSectionProps {
    src: string;
    caption?: string;
    header?: string;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ src, caption, header }) => {
    return (
        <div className="video-section">
            <div className="video-container">
                <video autoPlay loop muted playsInline>
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            {header && <p className="image-header">{header}</p>}
            {caption && <p className="caption">{caption}</p>}
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

export const TextContentWithMetadata: React.FC<TextContentWithMetadataProps> = ({ caption, body, metadata }) => {
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
    image: string;
}

const isVideo = (src: string) => /\.(mp4|webm|ogg|mov)([?#].*)?$/i.test(src);

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ image }) => {
    return (
        <section className="case-study-hero">
            {isVideo(image) ? (
                <video
                    src={image}
                    className="case-study-hero-image"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            ) : (
                <img src={image} alt="" className="case-study-hero-image" />
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
                <a href="/" className="sidebar-back-button">BACK</a>
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
