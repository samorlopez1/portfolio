'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Lottie from 'lottie-react';
import gsap from 'gsap';
import { Lightbox } from '../../components/Lightbox';
import './Gallery.css';

import seatacAirport from '../../assets/play_pictures/seatac_airport.webp';
import tokiHighball from '../../assets/play_pictures/toki_highball.webp';
import happyHour1 from '../../assets/play_pictures/happy_hour_1.webp';
import happyHour2 from '../../assets/play_pictures/happy_hour_2.webp';
import fittedGrean1 from '../../assets/play_pictures/fitted_grean_1.webp';
import fittedGrean2 from '../../assets/play_pictures/fitted_grean_2.webp';
import fittedFans1 from '../../assets/play_pictures/fitted_fans_1.webp';
import fittedFans2 from '../../assets/play_pictures/fitted_fans_2.webp';
import clothingSwap1 from '../../assets/play_pictures/clothing_swap_1.webp';
import clothingSwap2 from '../../assets/play_pictures/clothing_swap_2.webp';
import invisibleArchitecture1 from '../../assets/play_pictures/invisible_architecture_1.webp';
import invisibleArchitecture2 from '../../assets/play_pictures/invisible_architecture_2.webp';
import interviewWorkshop from '../../assets/play_pictures/interview_workshop.webp';
import openStudio from '../../assets/play_pictures/open_studio.webp';
import vitaminDesign from '../../assets/play_pictures/vitamin_design_2.json';


interface GalleryItemData {
    id: number;
    topImage: string | any; // image, video, or lottie
    bottomImage: string | any; // image, video, or lottie
    title: string;
    caption: string;
    titleLink?: string;
    secondCaption?: string;
    secondCaptionLink?: string;
}

function getMediaType(media: string | any): 'image' | 'video' | 'lottie' {
    if (typeof media === 'string') {
        if (media === 'NA') return 'image';
        if (media.endsWith('.mp4')) return 'video';
        if (media.endsWith('.json')) return 'lottie';
        return 'image';
    }
    // If it's an object, it's a Lottie animation data
    if (typeof media === 'object' && media.v) return 'lottie';
    return 'image';
}

function renderMedia(media: string | any, alt: string, className: string, isTopImage: boolean = false) {
    const type = getMediaType(media);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>) => {
        // Add "loaded" class to trigger fade-in animation
        e.currentTarget.classList.add('loaded');
    };

    if (type === 'video') {
        return (
            <video
                src={media}
                className={className}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                onLoadedMetadata={handleImageLoad}
            />
        );
    } else if (type === 'lottie') {
        return (
            <Lottie
                animationData={media}
                loop
                autoplay
                className={`${className} loaded`}
            />
        );
    } else {
        // Handle both string URLs and StaticImageData objects
        const imageSrc = typeof media === 'string' ? media : (media as any).src;
        return (
            <img
                src={imageSrc}
                alt={alt}
                className={className}
                loading={isTopImage ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={handleImageLoad}
            />
        );
    }
}

// Memoized Gallery Item component with lazy-loaded bottom images
interface GalleryItemProps {
    item: GalleryItemData;
    hoveredId: number | null;
    onMouseEnter: (id: number) => void;
    onMouseLeave: () => void;
    onImageClick: (id: number) => void;
}

function GalleryItem({
    item,
    hoveredId,
    onMouseEnter,
    onMouseLeave,
    onImageClick,
}: GalleryItemProps) {
    const [bottomImageLoaded, setBottomImageLoaded] = useState(item.bottomImage === 'NA');
    const bottomImageRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Use Intersection Observer to load bottom image only when near viewport
        if (item.bottomImage === 'NA') {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setBottomImageLoaded(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' } // Start loading 100px before image enters viewport
        );

        if (bottomImageRef.current) {
            observer.observe(bottomImageRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [item.bottomImage]);

    return (
        <div
            ref={itemRef}
            key={item.id}
            className="gallery-item"
            onMouseEnter={() => item.bottomImage !== 'NA' && onMouseEnter(item.id)}
            onMouseLeave={onMouseLeave}
            onClick={() => onImageClick(item.id)}
            style={{ cursor: 'pointer' }}
            suppressHydrationWarning
        >
            <div className="gallery-image-wrapper" ref={bottomImageRef}>
                {/* Bottom media - lazy loaded with Intersection Observer */}
                {item.bottomImage !== 'NA' && bottomImageLoaded && (
                    renderMedia(item.bottomImage, `${item.title} - bottom`, 'gallery-image bottom-image', false)
                )}

                {/* Top media - always rendered (high priority) */}
                <div className={`gallery-image top-image ${item.bottomImage !== 'NA' && hoveredId === item.id ? 'faded' : ''}`} suppressHydrationWarning>
                    {renderMedia(item.topImage, `${item.title} - top`, 'gallery-image', true)}
                </div>
            </div>

            <div className="gallery-item-info">
                {item.titleLink ? (
                    <a href={item.titleLink} className="gallery-item-title">{item.title}</a>
                ) : (
                    <p className="gallery-item-title">{item.title}</p>
                )}
                <p className="gallery-item-caption">{item.caption}</p>
                {item.secondCaption && (
                    item.secondCaptionLink ? (
                        <a href={item.secondCaptionLink} className="gallery-item-caption">{item.secondCaption}</a>
                    ) : (
                        <p className="gallery-item-caption">{item.secondCaption}</p>
                    )
                )}
            </div>
        </div>
    );
}

export function Gallery() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [lightboxId, setLightboxId] = useState<number | null>(null);
    const galleryGridRef = useRef<HTMLDivElement>(null);

    // Replace with your actual image data
    const galleryItems: GalleryItemData[] = [
        {
            id: 1,
            topImage: seatacAirport,
            bottomImage: 'NA',
            title: 'SEATAC AIRPORT',
            caption: 'SELF — FILM PHOTOGRAPHY',
        },
        {
            id: 2,
            topImage: tokiHighball,
            bottomImage: 'NA',
            title: 'GYO GYO EN',
            caption: 'INSTAGRAM STORY',
        },
        {
            id: 3,
            topImage: happyHour1,
            bottomImage: happyHour2,
            title: 'GYO GYO EN',
            caption: 'INSTAGRAM STORY',
        },
        {
            id: 4,
            topImage: fittedGrean1,
            bottomImage: fittedGrean2,
            title: 'FITTED.UW & GREAN MATCHA',
            caption: 'MENU & PROMOTIONAL MAATERIAL',
        },
        {
            id: 5,
            topImage: fittedFans1,
            bottomImage: fittedFans2,
            title: 'FITTED.UW',
            caption: 'BOX STICKER & FAN',
        },
        {
            id: 6,
            topImage: clothingSwap1,
            bottomImage: clothingSwap2,
            title: 'FITTED.UW',
            caption: 'PROMOTIONAL MATERIAL',
        },
        {
            id: 7,
            topImage: interviewWorkshop,
            bottomImage: 'NA',
            title: 'FITTED.UW',
            caption: 'PROMOTIONAL MATERIAL',
        },
        {
            id: 8,
            topImage: vitaminDesign,
            bottomImage: 'NA',
            title: 'UX@UW',
            caption: 'MOTION DESIGN PROMOTIONAL MATERIAL',
        },
        {
            id: 9,
            topImage: openStudio,
            bottomImage: 'NA',
            title: 'UX@UW',
            caption: 'INSTAGRAM POST',
        },
        {
            id: 10,
            topImage: invisibleArchitecture1,
            bottomImage: invisibleArchitecture2,
            title: 'FITTED.UW',
            caption: 'PROMOTIONAL MATERIAL',
        },
    ];

    const currentLightboxItem = galleryItems.find(item => item.id === lightboxId);
    // Create a non-mutating reversed copy
    const reversedItems = [...galleryItems].reverse();

    const handleImageClick = (itemId: number) => {
        setLightboxId(itemId);
    };

    // Simple staggered fade-in for each image wrapper on mount and caption
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        if (!galleryGridRef.current) return;

        const items = galleryGridRef.current.querySelectorAll('.gallery-item');
        if (!items.length) return;

        const targets = [headingRef.current, subtitleRef.current, ...items].filter(Boolean);

        gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power1.out',
        });
    }, []);

    return (
        <div className="gallery-page-wrapper">
            <main className="gallery-container">
                <div className="gallery-header">
                    <h1 ref={headingRef}>Playground</h1>
                    <p className="gallery-subtitle" ref={subtitleRef}>LAST UPDATED ON 2/20/26</p>
                </div>

                <div className="gallery-grid" ref={galleryGridRef}>
                    {reversedItems.map((item) => (
                        <GalleryItem
                            key={item.id}
                            item={item}
                            hoveredId={hoveredId}
                            onMouseEnter={setHoveredId}
                            onMouseLeave={() => setHoveredId(null)}
                            onImageClick={handleImageClick}
                        />
                    ))}
                </div>
            </main>

            {/* Lightbox Modal */}
            <Lightbox
                isOpen={lightboxId !== null}
                item={currentLightboxItem || null}
                onClose={() => setLightboxId(null)}
            />
        </div>
    );
}
