import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/campus-loop-logo.png';


const TeacherSidebar = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
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

    const menuItems = {
        main: [
            { to: '/teacher/dashboard', icon: 'bi-speedometer2', label: 'Dashboard', color: '#6366F1' },
        ],
        courses: [
            { to: '/teacher/courses', icon: 'bi-book-fill', label: 'My Courses', color: '#0EA5E9' },
            { to: '/teacher/course/create', icon: 'bi-plus-circle-fill', label: 'Create Course', color: '#10B981' },
        ],
        assignments: [
            { to: '/teacher/assignments', icon: 'bi-file-earmark-text-fill', label: 'Assignments', color: '#F59E0B' },
            { to: '/teacher/assignment/create', icon: 'bi-clipboard-plus', label: 'Create Assignment', color: '#8B5CF6' },
        ],
        other: [
            { to: '/teacher/analytics', icon: 'bi-graph-up', label: 'Analytics', color: '#EC4899' },
            { to: '/profile', icon: 'bi-person-circle', label: 'Profile', color: '#64748B' }
        ]
    };

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
                {/* Toggle Button */}
                <button
                    className="toggle-btn"
                    onClick={toggleSidebar}
                    aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
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
                                <span className="logo-tagline">Teacher Portal</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    {/* Main Section */}
                    <div className="menu-section">
                        {!isCollapsed && <h3 className="section-title">Main</h3>}
                        <div className="menu-items">
                            {menuItems.main.map((item) => (
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

                    {/* Courses Section */}
                    <div className="menu-section">
                        {!isCollapsed && <h3 className="section-title">Courses</h3>}
                        <div className="menu-items">
                            {menuItems.courses.map((item) => (
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

                    {/* Assignments Section */}
                    <div className="menu-section">
                        {!isCollapsed && <h3 className="section-title">Assignments</h3>}
                        <div className="menu-items">
                            {menuItems.assignments.map((item) => (
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

                    {/* Other Section */}
                    <div className="menu-section">
                        {!isCollapsed && <h3 className="section-title">More</h3>}
                        <div className="menu-items">
                            {menuItems.other.map((item) => (
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

            {/* Styles - Reusing student sidebar styles */}
            <style jsx>{`
                .sidebar {
                    position: fixed;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 285px;
                    background: var(--bg-primary);
                    border-right: 1px solid var(--border);
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
                    background: var(--bg-primary);
                    border: 1px solid var(--border);
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
                    background: var(--bg-secondary);
                    transform: scale(1.05);
                }

                .toggle-btn:active {
                    transform: scale(0.95);
                }

                .toggle-icon {
                    font-size: 16px;
                    color: var(--text-secondary);
                    transition: transform 0.2s ease;
                }

                /* Logo */
                .logo-container {
                    padding: 24px 20px;
                    border-bottom: 1px solid var(--border);
                    background: var(--bg-primary);
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
                    color: var(--primary);
                    white-space: nowrap;
                }

                .logo-tagline {
                    font-size: 10px;
                    font-weight: 600;
                    color: var(--text-tertiary);
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
                    color: var(--text-tertiary);
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
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    cursor: pointer;
                }

                .menu-item:hover {
                    background: var(--bg-secondary);
                }

                .menu-item.active {
                    background: var(--bg-tertiary);
                    color: var(--primary);
                }

                /* Icon Styling */
                .item-icon {
                    font-size: 20px;
                    color: var(--text-tertiary);
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
                    background: var(--bg-primary);
                    color: var(--text-primary);
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
                    border: 1px solid var(--border);
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
                    border-right: 8px solid var(--bg-primary);
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

export default TeacherSidebar;
