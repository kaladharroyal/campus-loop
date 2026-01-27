import React from "react";
import "./Footer.css"; 

const Footer = () => {
    return (
        <footer className="lms-footer fixed-bottom">
            <div className="footer-top">
                <div className="footer-brand">
                    <img src="/logo.png" alt="LMS Logo" className="footer-logo" />
                    <h3>CampusLoop LMS</h3>
                </div>
                <nav className="footer-links">
                    <a href="/about">About</a>
                    <a href="/courses">Courses</a>
                    <a href="/support">Support</a>
                    <a href="/contact">Contact</a>
                </nav>
            </div>

            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} CampusLoop LMS. All rights reserved.
                </p>
                <div className="footer-legal">
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
