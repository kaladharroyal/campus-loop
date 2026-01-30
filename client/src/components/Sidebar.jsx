import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';
import logo from '../assets/campus-loop-logo.png';

import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const { isSidebarHidden } = useLayout();
    const location = useLocation();
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleLinkClick = () => {
        if (onClose) onClose();
    };

    const menuItems = {
        discover: [
            { to: '/dashboard', icon: '🏠', label: 'Home' },
            { to: '/courses', icon: '📚', label: 'Browse Courses' }
        ],
        menu: [
            { to: '/favourites', icon: '❤️', label: 'Favourites' },
            { to: '/feedback', icon: '💬', label: 'Feedback' },
            { to: '/focus-mode', icon: '🎯', label: 'Focus Mode' },
            { to: '/ide', icon: '💻', label: 'IDE' },
            { to: '/profile', icon: '👤', label: 'Profile' }
        ]
    };



    if (isSidebarHidden) return null;

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                {/* Logo Section */}
                <div className="logo-container">
                    <div className="logo-wrapper">
                        <img src={logo} alt="CampusLoop" className="logo-img" />
                        <div className="logo-text-wrapper">
                            <span className="logo-text">CampusLoop</span>
                            <span className="logo-tagline">Learn Smarter</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    {/* Discover Section */}
                    <div className="menu-section">
                        <h3 className="section-title">Discover</h3>
                        <div className="menu-items">
                            {menuItems.discover.map((item, index) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
                                    onClick={handleLinkClick}
                                    onMouseEnter={() => setHoveredItem(`discover-${index}`)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                        animationDelay: `${index * 0.05}s`
                                    }}
                                >
                                    <span className="item-icon">{item.icon}</span>
                                    <span className="item-label">{item.label}</span>
                                    <span className="item-indicator"></span>
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Menu Section */}
                    <div className="menu-section">
                        <h3 className="section-title">Menu</h3>
                        <div className="menu-items">
                            {menuItems.menu.map((item, index) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
                                    onClick={handleLinkClick}
                                    onMouseEnter={() => setHoveredItem(`menu-${index}`)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                        animationDelay: `${(index + 2) * 0.05}s`
                                    }}
                                >
                                    <span className="item-icon">{item.icon}</span>
                                    <span className="item-label">{item.label}</span>
                                    <span className="item-indicator"></span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Decorative Element */}
                <div className="sidebar-decoration"></div>
            </div>


        </>
    );
};

export default Sidebar;