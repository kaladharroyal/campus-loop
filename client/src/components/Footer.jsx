import React from "react";
import "../styles/Footer.css";
import logo from "../assets/campus-loop-logo.png";

const Footer = () => {
    return (
        <footer className="lms-footer fixed-bottom">
            <div className="lms-footer-top">
                <div className="lms-footer-brand">
                    <img src={logo} alt="LMS Logo" className="lms-footer-logo" />
                    <h3>CampusLoop</h3>
                </div>
                <nav className="lms-footer-links">
                    <a href="/about">About</a>
                    <a href="/courses">Courses</a>
                    <a href="/support">Support</a>
                    <a href="/contact">Contact</a>
                </nav>
            </div>
            <div className="lms-footer-middle">
                <p>contact@campusloop.com </p>
                <p>+91 1234567890 </p>
                <p>vadlamudi, Guntur, AP, India</p>
            </div>

            <div className="lms-footer-bottom">
                <p>
                    © {new Date().getFullYear()} CampusLoop LMS. All rights reserved.
                </p>
                <div className="lms-footer-legal">
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;