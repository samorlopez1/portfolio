import './Footer.css';
import { ThreeJsHero } from './ThreeJsHero';

export function Footer() {
    return (
        <footer className="footer" data-node-id="854:347">
            {/* Footer Top */}
            <div className="footer-top" data-node-id="854:303">
                <div className="footer-content" data-node-id="854:304">
                    {/* Samuel Lopez Info */}
                    <div className="footer-column" data-node-id="854:305">
                        <p className="footer-title" data-node-id="854:306">
                            SAMUEL LOPEZ
                        </p>
                        <div className="footer-subtitle" data-node-id="854:307">
                            <p>PRODUCT DESIGNER</p>
                            <p>UNIVERSITY OF WASHINGTON</p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="footer-column" data-node-id="854:308">
                        <p className="footer-title" data-node-id="854:309">
                            CONTACT
                        </p>
                        <div className="footer-subtitle" data-node-id="854:310">
                            <p>SAMORLOPEZ.WORK@GMAIL.COM</p>
                            <p>RESUME</p>
                            <p>LINKEDIN</p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="footer-column" data-node-id="854:311">
                        <p className="footer-title" data-node-id="854:312">
                            LOCATION
                        </p>
                        <div className="footer-subtitle" data-node-id="854:313">
                            <p>SEATTLE, WA</p>
                            <p>BORN AND RAISED</p>
                        </div>
                    </div>

                    {/* Typography */}
                    <div className="footer-column" data-node-id="854:314">
                        <p className="footer-title" data-node-id="854:315">
                            TYPOGRAPHY
                        </p>
                        <div className="footer-subtitle" data-node-id="854:316">
                            <p>HELVETICA NEUE</p>
                            <p>PP EDITORIAL NEW</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom" data-node-id="854:317">
                <div className="footer-bottom-background" data-node-id="854:317">
                    <ThreeJsHero />
                </div>
                <div className="footer-bottom-content" data-node-id="854:318">
                    <div className="footer-bottom-column" data-node-id="854:319">
                        <p className="footer-meta" data-node-id="854:320">
                            LAST UPDATED ON 02/17/2026
                        </p>
                    </div>
                    <div className="footer-bottom-column" data-node-id="854:321">
                        <p className="footer-meta footer-back-to-top" data-node-id="854:322">
                            BACK TO TOP
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
