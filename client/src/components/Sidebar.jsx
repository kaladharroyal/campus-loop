import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';
import logo from '../assets/campus-loop-logo.png';

const Sidebar = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const { isSidebarHidden } = useLayout();
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleLinkClick = () => {
        if (onClose) onClose();
    };

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    // Broadcast sidebar state changes to the entire app
    useEffect(() => {
        const state = isSidebarHidden ? 'hidden' : isCollapsed ? 'collapsed' : 'expanded';
        
        // Dispatch custom event
        const event = new CustomEvent('sidebarStateChange', {
            detail: { state, isCollapsed, isSidebarHidden }
        });
        window.dispatchEvent(event);
    }, [isCollapsed, isSidebarHidden]);

    const menuItems = {
        discover: [
            { to: '/dashboard', icon: 'bi-house-door-fill', label: 'Home', color: '#6366F1' },
            { to: '/courses', icon: 'bi-book-fill', label: 'Browse Courses', color: '#0EA5E9' }
        ],
        menu: [
            { to: '/favourites', icon: 'bi-heart-fill', label: 'Favourites', color: '#EF4444' },
            { to: '/feedback', icon: 'bi-chat-dots-fill', label: 'Feedback', color: '#22C55E' },
            { to: '/focus-mode', icon: 'bi-bullseye', label: 'Focus Mode', color: '#F59E0B' },
            { to: '/ide', icon: 'bi-code-slash', label: 'IDE', color: '#8B5CF6' },
            { to: '/profile', icon: 'bi-person-circle', label: 'Profile', color: '#64748B' }
        ]
    };

    if (isSidebarHidden) return null;

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>

                {/* Toggle / Close Button */}
                <button 
                    className="toggle-btn" 
                    onClick={toggleSidebar} 
                    aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    title={isCollapsed ? "Expand" : "Collapse"}
                >
                    <i className={`toggle-icon ${isCollapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
                </button>

                {/* Logo Section */}
                <div className="logo-container">
                    <div className="logo-wrapper">
                        <img src={logo} alt="CampusLoop" className="logo-img" />
                        {!isCollapsed && (
                            <div className="logo-text-wrapper">
                                <span className="logo-text">CampusLoop</span>
                                <span className="logo-tagline">Learn Smarter</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav">

                    {/* Discover Section */}
                    <div className="menu-section">
                        {!isCollapsed && <h3 className="section-title">Discover</h3>}
                        <div className="menu-items">
                            {menuItems.discover.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
                                    onClick={handleLinkClick}
                                    data-tooltip={item.label}
                                >
                                    <i
                                        className={`item-icon ${item.icon}`}
                                        style={{ '--icon-color': item.color }}
                                    ></i>
                                    {!isCollapsed && <span className="item-label">{item.label}</span>}
                                    {!isCollapsed && <span className="item-indicator"></span>}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Menu Section */}
                    <div className="menu-section">
                        {!isCollapsed && <h3 className="section-title">Menu</h3>}
                        <div className="menu-items">
                            {menuItems.menu.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
                                    onClick={handleLinkClick}
                                    data-tooltip={item.label}
                                >
                                    <i
                                        className={`item-icon ${item.icon}`}
                                        style={{ '--icon-color': item.color }}
                                    ></i>
                                    {!isCollapsed && <span className="item-label">{item.label}</span>}
                                    {!isCollapsed && <span className="item-indicator"></span>}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>

            {/* ===================== STYLES ===================== */}
            <style jsx>{`
                .sidebar {
                    position: fixed;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 285px;
                    background: #ffffff;
                    border-right: 1px solid #e5e7eb;
                    display: flex;
                    flex-direction: column;
                    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: var(--z-modal);
                }

                .sidebar.collapsed {
                    width: 72px;
                }

                /* Toggle / Close Button */
                .toggle-btn {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    width: 28px;
                    height: 28px;
                    background: #ffffff;
                    border: 1px solid #e5e7eb;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 200;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
                    padding: 0;
                }

                .toggle-btn:hover {
                    background: #f9fafb;
                    transform: scale(1.05);
                }

                .toggle-btn:active {
                    transform: scale(0.95);
                }

                .toggle-icon {
                    font-size: 16px;
                    color: #374151;
                    transition: transform 0.2s ease;
                }

                /* Logo */
                .logo-container {
                    padding: 24px 20px;
                    border-bottom: 1px solid #f3f4f6;
                    background: #ffffff;
                    flex-shrink: 0;
                    margin-top: 35px;
                    transition: padding 0.3s ease;
                }

                .sidebar.collapsed .logo-container {
                    padding: 24px 12px;
                }

                .logo-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    transition: gap 0.3s ease;
                }

                .logo-img {
                    height: 40px;
                    width: 40px;
                    object-fit: contain;
                    flex-shrink: 0;
                }

                .logo-text-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    min-width: 0;
                }

                .logo-text {
                    font-size: 18px;
                    font-weight: 600;
                    color: #6366f1;
                    white-space: nowrap;
                }

                .logo-tagline {
                    font-size: 10px;
                    font-weight: 600;
                    color: #9ca3af;
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                /* Navigation */
                .sidebar-nav {
                    flex: 1;
                    padding: 24px 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                    overflow-y: auto;
                    transition: padding 0.3s ease;
                }

                .sidebar.collapsed .sidebar-nav {
                    gap: 24px;
                }

                .menu-section {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .section-title {
                    font-size: 11px;
                    font-weight: 700;
                    color: #9ca3af;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    padding: 0 12px;
                    margin-bottom: 4px;
                }

                .menu-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-radius: 10px;
                    color: #6b7280;
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    cursor: pointer;
                }

                .menu-item:hover {
                    background: #f9fafb;
                }

                .menu-item.active {
                    background: #eef2ff;
                    color: #6366f1;
                }

                /* Icon Styling */
                .item-icon {
                    font-size: 20px;
                    color: #9ca3af;
                    transition: color 0.2s ease, transform 0.2s ease;
                    flex-shrink: 0;
                }

                .menu-item:hover .item-icon {
                    color: var(--icon-color);
                    transform: scale(1.05);
                }

                .menu-item.active .item-icon {
                    color: var(--icon-color);
                }

                .item-label {
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .item-indicator {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: currentColor;
                    opacity: 0;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }

                .menu-item.active .item-indicator {
                    opacity: 1;
                }

                /* Tooltip for collapsed sidebar - Show text on hover */
                .sidebar.collapsed .menu-item {
                    position: relative;
                }

                .sidebar.collapsed .menu-item::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-left: 12px;
                    background: #ffffff;
                    color: #1f2937;
                    padding: 12px 16px;
                    border-radius: 8px;
                    white-space: nowrap;
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                    opacity: 0;
                    pointer-events: auto;
                    z-index: 10000;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e5e7eb;
                    visibility: hidden;
                    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.3s, visibility 0.3s 0.3s;
                }

                .sidebar.collapsed .menu-item:hover::after {
                    opacity: 1;
                    visibility: visible;
                }

                /* Arrow pointer */
                .sidebar.collapsed .menu-item::before {
                    content: '';
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-left: 4px;
                    width: 0;
                    height: 0;
                    border-right: 8px solid #ffffff;
                    border-top: 6px solid transparent;
                    border-bottom: 6px solid transparent;
                    opacity: 0;
                    pointer-events: none;
                    z-index: 10001;
                    visibility: hidden;
                    filter: drop-shadow(-2px 0px 2px rgba(0, 0, 0, 0.1));
                    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.3s, visibility 0.3s 0.3s;
                }

                .sidebar.collapsed .menu-item:hover::before {
                    opacity: 1;
                    visibility: visible;
                }

                /* Make sidebar overflow visible for tooltips */
                .sidebar.collapsed .sidebar-nav {
                    overflow: visible;
                }

                .sidebar.collapsed .menu-items {
                    overflow: visible;
                }

                /* Mobile Support */
                @media (max-width: 768px) {
                    .sidebar {
                        position: fixed;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        width: 285px;
                        transform: translateX(-100%);
                        /* Smooth transition for BOTH opening and closing */
                        transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                        will-change: transform;
                    }

                    .sidebar.open {
                        transform: translateX(0);
                        box-shadow: 2px 0 16px rgba(0,0,0,0.1);
                    }

                    .toggle-btn {
                        top: 14px;
                        right: 14px;
                        background: transparent;
                        border: none;
                        box-shadow: none;
                    }

                    .toggle-icon {
                        font-size: 20px;
                        color: #111827;
                    }
                }
            `}</style>
        </>
    );
};

export default Sidebar;