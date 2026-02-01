import React from "react";
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
        { 
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            ),
            label: 'Twitter',
            href: '#'
        },
        { 
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            ),
            label: 'LinkedIn',
            href: '#'
        },
        { 
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            ),
            label: 'Instagram',
            href: '#'
        },
        { 
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            ),
            label: 'GitHub',
            href: '#'
        }
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
                    padding: 40px 32px 24px;
                    display: grid;
                    grid-template-columns: 1.5fr 1fr 1fr;
                    gap: 48px;
                }

                /* Footer Sections */
                .footer-section {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
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
                    transform: scale(1.1);
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
                    color: var(--text-secondary);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
                }

                .social-link:hover {
                    background: linear-gradient(135deg, var(--primary), var(--accent));
                    color: white;
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lg);
                }

                .social-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
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
                    gap: 6px;
                }

                .footer-link {
                    display: inline-block;
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 500;
                    animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
                    padding: 10px 24px;
                    border-radius: 8px;
                    width: 100%;
                    max-width: 200px;
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }

                .footer-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(90deg, 
                        var(--primary) 0%, 
                        var(--accent) 100%);
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    z-index: -1;
                    border-radius: 8px;
                }

                .footer-link:hover::before {
                    opacity: 1;
                }

                .footer-link:hover {
                    color: white;
                    transition: color 0.3s ease;
                }

                /* Contact Section */
                .contact-list {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
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
                    padding: 20px 32px;
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
                    height: 150px;
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
                        padding: 32px 20px 20px;
                        gap: 28px;
                    }

                    .footer-bottom-container {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 16px 20px;
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