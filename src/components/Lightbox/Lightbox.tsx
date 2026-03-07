import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import './Lightbox.css';

interface LightboxItem {
    id: number;
    topImage: string | any;
    bottomImage?: string | any;
    title: string;
    caption: string;
}

interface LightboxProps {
    isOpen: boolean;
    item: LightboxItem | null;
    onClose: () => void;
}

export type { LightboxProps };

function getMediaType(media: string | any): 'image' | 'video' | 'lottie' {
    if (typeof media === 'string') {
        if (media === 'NA') return 'image';
        if (media.endsWith('.mp4')) return 'video';
        if (media.endsWith('.json')) return 'lottie';
        return 'image';
    }
    if (typeof media === 'object' && media.v) return 'lottie';
    return 'image';
}

function renderMedia(media: string | any, alt: string, className: string) {
    const type = getMediaType(media);

    if (type === 'video') {
        return <video src={media} className={className} muted loop autoPlay />;
    } else if (type === 'lottie') {
        return <Lottie animationData={media} loop autoplay className={className} />;
    } else {
        return <img src={media} alt={alt} className={className} />;
    }
}

export function Lightbox({ isOpen, item, onClose }: LightboxProps) {
    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        setCarouselIndex(0);
    }, [item?.id]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !item) return null;

    const hasBottomImage = item.bottomImage && item.bottomImage !== 'NA';

    const handlePrev = () => {
        setCarouselIndex(carouselIndex === 0 ? 1 : 0);
    };

    const handleNext = () => {
        setCarouselIndex(carouselIndex === 0 ? 1 : 0);
    };

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <button className="lightbox-close" onClick={onClose}>
                    ✕
                </button>

                <div className={`lightbox-media-container ${hasBottomImage ? 'side-by-side' : ''}`} data-carousel-index={carouselIndex}>
                    {/* Top/Primary image */}
                    <div className="lightbox-media" data-carousel-index="0">
                        {renderMedia(item.topImage, `${item.title} - top`, 'lightbox-image')}
                    </div>

                    {/* Bottom image - show side by side if it exists */}
                    {hasBottomImage && (
                        <div className="lightbox-media" data-carousel-index="1">
                            {renderMedia(item.bottomImage, `${item.title} - bottom`, 'lightbox-image')}
                        </div>
                    )}
                </div>

                {/* Carousel navigation - only visible on mobile */}
                {hasBottomImage && (
                    <div className="lightbox-carousel-nav">
                        <button className="carousel-btn" onClick={handlePrev}>
                            PREV
                        </button>
                        <div className="carousel-dots">
                            <button
                                className={`dot ${carouselIndex === 0 ? 'active' : ''}`}
                                onClick={() => setCarouselIndex(0)}
                            />
                            <button
                                className={`dot ${carouselIndex === 1 ? 'active' : ''}`}
                                onClick={() => setCarouselIndex(1)}
                            />
                        </div>
                        <button className="carousel-btn" onClick={handleNext}>
                            NEXT
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
