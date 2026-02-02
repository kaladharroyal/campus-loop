import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/components.css';

const Topbar = ({ onToggleMenu }) => {
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    const isProfile = location.pathname === '/profile';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const tabs = [
        { to: '/dashboard', label: 'Courses' },
        { to: '/assignments', label: 'Assignments' },
        // { to: '/feedback', label: 'Feedback' }
    ];

    return (
        <>
            <div className={`topbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="topbar-container">
                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={onToggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>

                    {/* Navigation Tabs */}
                    <nav className="topbar-tabs">
                        {tabs.map((tab, index) => (
                            <NavLink
                                key={tab.to}
                                to={tab.to}
                                className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <span className="tab-label">{tab.label}</span>
                                <span className="tab-underline"></span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="topbar-actions">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle-btn"
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            <span className="theme-icon">
                                {theme === 'light' ? '🌙' : '☀️'}
                            </span>
                        </button>

                        {/* Logout Button (Profile Page Only) */}
                        {isProfile && (
                            <button onClick={logout} className="logout-btn">
                                <span className="logout-icon">🚪</span>
                                <span className="logout-text">Log out</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Gradient Border */}
                <div className="topbar-border"></div>
            </div>

            <style jsx>{`
    .topbar {
        position: sticky;
        top: 0;
        z-index: var(--z-sticky);
        background: var(--bg-primary);
        transition: all var(--transition-base);
        animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .topbar.scrolled {
        background: rgba(var(--bg-primary-rgb), 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: var(--shadow-md);
    }

    .topbar-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-md) var(--spacing-xl);
        gap: var(--spacing-lg);
        max-width: 1600px;
        margin: 0 auto;
    }

    /* Mobile Menu Button */
    .mobile-menu-btn {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--spacing-sm);
        border-radius: var(--radius-sm);
        transition: all var(--transition-base);
    }

    .mobile-menu-btn:hover {
        background: var(--bg-tertiary);
    }

    .hamburger-line {
        width: 24px;
        height: 2px;
        background: var(--text-primary);
        border-radius: 2px;
        transition: all var(--transition-base);
    }

    .mobile-menu-btn:hover .hamburger-line {
        background: var(--primary);
    }

    /* Navigation Tabs */
    .topbar-tabs {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        flex: 1;
    }

    .tab-btn {
        position: relative;
        padding: 10px 20px;
        font-size: 15px;
        font-weight: 600;
        color: var(--text-secondary);
        text-decoration: none;
        border-radius: var(--radius-md);
        transition: all var(--transition-base);
        overflow: hidden;
        animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
    }

    .tab-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--bg-tertiary);
        opacity: 0;
        transition: opacity var(--transition-base);
        border-radius: var(--radius-md);
    }

    .tab-btn:hover {
        color: var(--primary);
    }

    .tab-btn:hover::before {
        opacity: 1;
    }

    .tab-label {
        position: relative;
        z-index: 1;
    }

    .tab-underline {
        position: absolute;
        bottom: 6px;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 60%;
        height: 3px;
        background: var(--accent-gradient);
        border-radius: 2px;
        transition: transform var(--transition-base);
    }

    .tab-btn.active {
        color: var(--primary);
        background: var(--bg-tertiary);
    }

    .tab-btn.active .tab-underline {
        transform: translateX(-50%) scaleX(1);
    }

    /* Actions */
    .topbar-actions {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .theme-toggle-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border: none;
        background: var(--bg-tertiary);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-base);
        position: relative;
        overflow: hidden;
    }

    .theme-toggle-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--primary-gradient);
        opacity: 0;
        transition: opacity var(--transition-base);
    }

    .theme-toggle-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    }

    .theme-toggle-btn:hover::before {
        opacity: 0.1;
    }

    .theme-toggle-btn:active {
        transform: scale(0.95);
    }

    .theme-icon {
        font-size: 20px;
        position: relative;
        z-index: 1;
        transition: transform var(--transition-base);
    }

    .theme-toggle-btn:hover .theme-icon {
        transform: rotate(20deg);
    }

    .logout-btn {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: 10px 20px;
        background: var(--accent-gradient);
        color: var(--text-inverse);
        border: none;
        border-radius: var(--radius-md);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--transition-base);
        box-shadow: 0 2px 8px rgba(236, 72, 153, 0.2);
        animation: fadeInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .logout-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(236, 72, 153, 0.3);
    }

    .logout-btn:active {
        transform: translateY(0);
    }

    .logout-icon {
        font-size: 16px;
    }

    .logout-text {
        letter-spacing: 0.3px;
    }

    /* Gradient Border */
    .topbar-border {
        height: 2px;
        background: var(--accent-gradient);
        opacity: 0.5;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        .topbar-container {
            padding: var(--spacing-sm) var(--spacing-md);
        }

        .mobile-menu-btn {
            display: flex;
        }

        .topbar-tabs {
            gap: 4px;
        }

        .tab-btn {
            padding: 8px 12px;
            font-size: 13px;
        }

        .logout-text {
            display: none;
        }

        .logout-btn {
            padding: 10px 14px;
        }
    }

    @media (max-width: 480px) {
        .topbar-tabs {
            display: none;
        }
    }

    /* Animations */
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
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
`}</style>
        </>
    );
};

export default Topbar;