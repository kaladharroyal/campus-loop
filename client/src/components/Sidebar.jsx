import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/campus-loop-logo.png';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <div className="logo-container">
                <img src={logo} alt="CampusLoop" className="logo-img" style={{ height: '80px' }} />
                <span className="logo-text">CampusLoop</span>
            </div>

            <div className="menu-section">
                <h3>Discover</h3>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
                    <span className="icon">🏠</span> Home
                </NavLink>
                <NavLink to="/courses" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
                    <span className="icon">🔍</span> Browse Courses
                </NavLink>
            </div>

            <div className="menu-section">
                <h3>Menu</h3>
                <NavLink to="/favourites" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
                    <span className="icon">❤️</span> Favourite
                </NavLink>
                <NavLink to="/feedback" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
                    <span className="icon">≡</span> Feedback
                </NavLink>
                <NavLink to="/focus-mode" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
                    <span className="icon">▶️</span> Focus Mode
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
                    <span className="icon">👤</span> Profile
                </NavLink>
            </div>

            {/* Logout optionally at bottom or handled in topbar as per design mock, 
          but design shows logout button in main content area sometimes. 
          Keeping sidebar generic. */}
        </div>
    );
};

export default Sidebar;
