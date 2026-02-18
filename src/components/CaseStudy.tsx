import './CaseStudy.css';

interface CaseStudyProps {
    thumbnail?: string;
    caption?: string;
}

export function CaseStudyWrapper({ thumbnail, caption }: CaseStudyProps) {
    return (
        <div className="case-study-wrapper" data-node-id="854:325">
            <div className="case-study-thumbnail" data-node-id="854:232">
                {thumbnail ? (
                    <img src={thumbnail} alt={caption || 'Case study'} />
                ) : (
                    <div className="placeholder" />
                )}
            </div>
            <div className="case-study-text" data-node-id="854:233">
                <p className="case-study-caption" data-node-id="854:234">
                    {caption || 'This is a caption'}
                </p>
            </div>
        </div>
    );
}

export function CaseStudies() {
    return (
        <section className="case-studies" data-node-id="854:342">
            <CaseStudyWrapper caption="This is a caption" />
            <CaseStudyWrapper caption="This is a caption" />
            <CaseStudyWrapper caption="This is a caption" />
            <CaseStudyWrapper caption="This is a caption" />
        </section>
    );
}
