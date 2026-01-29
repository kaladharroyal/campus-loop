import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/components.css';

const Topbar = ({ onToggleMenu }) => {
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const isProfile = location.pathname === '/profile';

    return (
        <div className="topbar">
            <button className="mobile-menu-btn" onClick={onToggleMenu}>
                ☰
            </button>
            <div className="topbar-tabs">
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'tab-btn active' : 'tab-btn')}>
                    Courses
                </NavLink>
                <NavLink to="/assignments" className={({ isActive }) => (isActive ? 'tab-btn active' : 'tab-btn')}>
                    assignments
                </NavLink>
                <NavLink to="/feedback" className={({ isActive }) => (isActive ? 'tab-btn active' : 'tab-btn')}>
                    Feedback
                </NavLink>
            </div>

            <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button onClick={toggleTheme} className="theme-toggle-btn" style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem' }}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>

                {isProfile && (
                    <button onClick={logout} className="logout-btn">Log out</button>
                )}
            </div>
        </div>
    );
};

export default Topbar;
