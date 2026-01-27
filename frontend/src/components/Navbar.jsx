import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="lms-navbar fixed-top m-1">
            <div className="navbar-brand">
                <img src="/logo.png" alt="LMS Logo" className="navbar-logo" />
                <h2>CampusLoop LMS</h2>
            </div>

            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>

            <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/courses">Courses</a></li>
                <li><a href="/assignments">Assignments</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/support">Support</a></li>
            </ul>

            <div className="navbar-actions">
                <a href="/notifications" className="icon">🔔</a>
                <a href="/login" className="btn-login">Login</a>
            </div>
        </nav>
    );
};

export default Navbar;