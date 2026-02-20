import { useState } from 'react';
import './CaseStudy.css';
import { caseStudiesData } from '../data/caseStudies';
import LottiePlayer from 'react-lottie-player';
import tagCorner from '../assets/tag-corner.svg';

interface CaseStudyProps {
    thumbnail?: string | object;
    caption?: string;
}

export function CaseStudyWrapper({ thumbnail, caption, date }: CaseStudyProps & { date?: string }) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div
            className="case-study-wrapper"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="case-study-thumbnail" data-node-id="854:232">
                {thumbnail ? (
                    typeof thumbnail === 'object' ? (
                        <LottiePlayer className="case-study-lottie" loop animationData={thumbnail} play={isHovering} />
                    ) : (
                        <img src={thumbnail} alt={caption || 'Case study'} />
                    )
                ) : (
                    <div className="placeholder" />
                )}
            </div>

            <div className="case-study-text">
                <div className="case-study-tag-wrapper">
                    <p className="case-study-date">
                        {date || '2026'}
                    </p>
                    <div className="case-study-corner">
                        <img src={tagCorner} alt="corner" />
                    </div>
                </div>
                <p className="case-study-caption">
                    {caption || 'This is a caption'}
                </p>
            </div>
        </div>
    );
}

export function CaseStudies() {
    return (
        <section className="case-studies" id="work">
            {caseStudiesData.map((caseStudy) => (
                <CaseStudyWrapper
                    key={caseStudy.id}
                    caption={caseStudy.caption}
                    thumbnail={caseStudy.thumbnail}
                    date={caseStudy.date}
                />
            ))}
        </section>
    );
}
