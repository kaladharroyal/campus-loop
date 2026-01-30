import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/campus-loop-logo.png';

const Sidebar = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
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

            <style jsx>{`
    .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 280px;
        background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        border-right: 1px solid var(--border);
        display: flex;
        flex-direction: column;
        z-index: var(--z-modal);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow-y: auto;
        overflow-x: hidden;
    }

    .sidebar::-webkit-scrollbar {
        width: 6px;
    }

    .sidebar::-webkit-scrollbar-track {
        background: transparent;
    }

    .sidebar::-webkit-scrollbar-thumb {
        background: var(--border);
        border-radius: 3px;
    }

    .sidebar::-webkit-scrollbar-thumb:hover {
        background: var(--text-tertiary);
    }

    /* Logo Section */
    .logo-container {
        padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-lg);
        border-bottom: 1px solid var(--border);
        background: var(--bg-primary);
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .logo-img {
        height: 48px;
        width: 48px;
        object-fit: contain;
        transition: transform 0.3s ease;
    }

    .logo-wrapper:hover .logo-img {
        transform: scale(1.05) rotate(5deg);
    }

    .logo-text-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .logo-text {
        font-size: 20px;
        font-weight: 700;
        color: var(--text-primary);
        letter-spacing: -0.5px;
    }

    .logo-tagline {
        font-size: 12px;
        font-weight: 500;
        color: var(--text-tertiary);
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }

    /* Navigation */
    .sidebar-nav {
        flex: 1;
        padding: var(--spacing-lg) var(--spacing-md);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xl);
    }

    .menu-section {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .section-title {
        font-size: 11px;
        font-weight: 700;
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 0 var(--spacing-sm);
        margin-bottom: 4px;
    }

    .menu-items {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-md);
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 15px;
        font-weight: 500;
        position: relative;
        overflow: hidden;
        transition: all var(--transition-base);
        animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
    }

    .menu-item::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--primary-gradient);
        opacity: 0;
        transition: opacity var(--transition-base);
        border-radius: var(--radius-md);
    }

    .menu-item:hover {
        color: var(--primary);
        background: var(--bg-tertiary);
        transform: translateX(4px);
    }

    .menu-item.active {
        color: var(--text-inverse);
        background: var(--primary-gradient);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        transform: translateX(4px);
    }

    .menu-item.active::before {
        opacity: 1;
    }

    .item-icon {
        font-size: 20px;
        position: relative;
        z-index: 1;
        transition: transform var(--transition-base);
    }

    .menu-item:hover .item-icon {
        transform: scale(1.1);
    }

    .item-label {
        position: relative;
        z-index: 1;
        flex: 1;
    }

    .item-indicator {
        width: 6px;
        height: 6px;
        border-radius: var(--radius-full);
        background: currentColor;
        opacity: 0;
        transform: scale(0);
        transition: all var(--transition-base);
        position: relative;
        z-index: 1;
    }

    .menu-item.active .item-indicator {
        opacity: 1;
        transform: scale(1);
    }

    /* Decorative Element */
    .sidebar-decoration {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 120px;
        background: linear-gradient(180deg, transparent 0%, var(--primary) 100%);
        opacity: 0.03;
        pointer-events: none;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
        .sidebar {
            transform: translateX(-100%);
        }

        .sidebar.open {
            transform: translateX(0);
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
`}</style>
        </>
    );
};

export default Sidebar;