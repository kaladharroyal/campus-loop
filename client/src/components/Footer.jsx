import React from "react";
import "../styles/Footer.css";
import logo from "../assets/campus-loop-logo.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { label: 'About', href: '/about' },
            { label: 'Courses', href: '/courses' },
            { label: 'Support', href: '/support' },
            { label: 'Contact', href: '/contact' }
        ],
        legal: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' }
        ]
    };

    const contactInfo = [
        { icon: '📧', text: 'contact@campusloop.com', type: 'email' },
        { icon: '📞', text: '+91 1234567890', type: 'phone' },
        { icon: '📍', text: 'Vadlamudi, Guntur, AP, India', type: 'address' }
    ];

    const socialLinks = [
        { icon: '🐦', label: 'Twitter', href: '#' },
        { icon: '💼', label: 'LinkedIn', href: '#' },
        { icon: '📘', label: 'Facebook', href: '#' },
        { icon: '📸', label: 'Instagram', href: '#' }
    ];

    return (
        <>
            <footer className="lms-footer">
                {/* Decorative Top Border */}
                <div className="footer-top-border"></div>

                {/* Main Footer Content */}
                <div className="footer-container">
                    {/* Brand Section */}
                    <div className="footer-section footer-brand">
                        <div className="brand-wrapper">
                            <img src={logo} alt="CampusLoop" className="footer-logo" />
                            <div className="brand-text">
                                <h3 className="brand-name">CampusLoop</h3>
                                <p className="brand-tagline">Empowering Education, One Click at a Time</p>
                            </div>
                        </div>
                        
                        {/* Social Links */}
                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="social-link"
                                    aria-label={social.label}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <span className="social-icon">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="footer-section footer-links">
                        <h4 className="section-title">Quick Links</h4>
                        <nav className="links-grid">
                            {footerLinks.company.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="footer-link"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <span className="link-arrow">→</span>
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Section */}
                    <div className="footer-section footer-contact">
                        <h4 className="section-title">Get in Touch</h4>
                        <div className="contact-list">
                            {contactInfo.map((contact, index) => (
                                <div
                                    key={index}
                                    className="contact-item"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <span className="contact-icon">{contact.icon}</span>
                                    <span className="contact-text">{contact.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <div className="footer-bottom-container">
                        <p className="copyright">
                            © {currentYear} CampusLoop LMS. All rights reserved.
                        </p>
                        <div className="legal-links">
                            {footerLinks.legal.map((link, index) => (
                                <a key={index} href={link.href} className="legal-link">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Background Decoration */}
                <div className="footer-decoration"></div>
            </footer>

            <style jsx>{`
                .lms-footer {
                    position: relative;
                    background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
                    overflow: hidden;
                }

                /* Top Border */
                .footer-top-border {
                    height: 3px;
                    background: linear-gradient(90deg, 
                        var(--primary) 0%, 
                        var(--accent) 50%, 
                        var(--primary) 100%);
                    opacity: 0.8;
                }

                /* Container */
                .footer-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 60px 32px 40px;
                    display: grid;
                    grid-template-columns: 1.5fr 1fr 1fr;
                    gap: 48px;
                }

                /* Footer Sections */
                .footer-section {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) backwards;
                }

                .footer-brand {
                    animation-delay: 0s;
                }

                .footer-links {
                    animation-delay: 0.1s;
                }

                .footer-contact {
                    animation-delay: 0.2s;
                }

                /* Brand Section */
                .brand-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 8px;
                }

                .footer-logo {
                    width: 56px;
                    height: 56px;
                    object-fit: contain;
                    transition: transform 0.3s ease;
                }

                .brand-wrapper:hover .footer-logo {
                    transform: scale(1.05) rotate(5deg);
                }

                .brand-text {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .brand-name {
                    font-size: 24px;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0;
                    letter-spacing: -0.5px;
                }

                .brand-tagline {
                    font-size: 13px;
                    color: var(--text-tertiary);
                    margin: 0;
                    font-weight: 500;
                }

                /* Social Links */
                .social-links {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .social-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    background: var(--bg-tertiary);
                    border-radius: 12px;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
                }

                .social-link:hover {
                    background: linear-gradient(135deg, var(--primary), var(--accent));
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lg);
                }

                .social-icon {
                    font-size: 20px;
                    transition: transform 0.3s ease;
                }

                .social-link:hover .social-icon {
                    transform: scale(1.1);
                }

                /* Section Titles */
                .section-title {
                    font-size: 12px;
                    font-weight: 700;
                    color: var(--text-tertiary);
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin: 0;
                    margin-bottom: 4px;
                }

                /* Links Section */
                .links-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .footer-link {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 500;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
                    padding: 8px 12px;
                    border-radius: 8px;
                    margin-left: -12px;
                }

                .footer-link:hover {
                    color: var(--primary);
                    background: var(--bg-tertiary);
                    transform: translateX(8px);
                }

                .link-arrow {
                    font-size: 18px;
                    transition: transform 0.3s ease;
                }

                .footer-link:hover .link-arrow {
                    transform: translateX(4px);
                }

                /* Contact Section */
                .contact-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .contact-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    animation: fadeInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
                }

                .contact-icon {
                    font-size: 20px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    background: var(--bg-tertiary);
                    border-radius: 10px;
                }

                .contact-text {
                    color: var(--text-secondary);
                    font-size: 14px;
                    line-height: 1.6;
                    padding-top: 6px;
                }

                /* Bottom Section */
                .footer-bottom {
                    border-top: 1px solid var(--border-color);
                    background: var(--bg-primary);
                }

                .footer-bottom-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 24px 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 24px;
                    flex-wrap: wrap;
                }

                .copyright {
                    font-size: 14px;
                    color: var(--text-tertiary);
                    margin: 0;
                }

                .legal-links {
                    display: flex;
                    gap: 24px;
                }

                .legal-link {
                    font-size: 14px;
                    color: var(--text-secondary);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .legal-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: var(--primary);
                    transition: width 0.3s ease;
                }

                .legal-link:hover {
                    color: var(--primary);
                }

                .legal-link:hover::after {
                    width: 100%;
                }

                /* Background Decoration */
                .footer-decoration {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 200px;
                    background: linear-gradient(135deg, 
                        var(--primary) 0%, 
                        var(--accent) 100%);
                    opacity: 0.02;
                    pointer-events: none;
                }

                /* Animations */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                /* Responsive Design */
                @media (max-width: 1024px) {
                    .footer-container {
                        grid-template-columns: 1fr 1fr;
                        gap: 40px;
                    }

                    .footer-brand {
                        grid-column: 1 / -1;
                    }
                }

                @media (max-width: 640px) {
                    .footer-container {
                        grid-template-columns: 1fr;
                        padding: 40px 20px 32px;
                        gap: 32px;
                    }

                    .footer-bottom-container {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 20px;
                        gap: 16px;
                    }

                    .legal-links {
                        flex-direction: column;
                        gap: 12px;
                    }

                    .brand-wrapper {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
            `}</style>
        </>
    );
};

export default Footer;