import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

/**
 * AdminTopbar component
 * Top navigation bar for admin pages
 * Shows admin profile, notifications, and quick actions
 */
const AdminTopbar = ({ user }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { logout } = useAuth();

    return (
        <header className="admin-topbar">
            <div className="topbar-left">
                <h1 className="page-title">Admin Dashboard</h1>
            </div>

            <div className="topbar-right">
                {/* Search */}
                {/* <div className="topbar-search">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                </div> */}

                {/* Notifications */}
                <button className="topbar-icon-btn" aria-label="Notifications">
                    <span>🔔</span>
                    <span className="notification-badge">3</span>
                </button>

                {/* Profile Dropdown */}
                <div className="topbar-profile">
                    <button
                        className="profile-btn"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <div className="profile-avatar">
                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </div>
                        <div className="profile-info">
                            <span className="profile-name">
                                {user?.firstName} {user?.lastName}
                            </span>
                            <span className="profile-role">Administrator</span>
                        </div>
                        <span className="dropdown-arrow">▼</span>
                    </button>

                    {showProfileMenu && (
                        <div className="profile-menu">
                            <a href="/admin/profile" className="profile-menu-item">
                                <span>👤</span> Profile
                            </a>
                            <a href="/admin/settings" className="profile-menu-item">
                                <span>⚙️</span> Settings
                            </a>
                            <hr className="menu-divider" />
                            <button
                                className="profile-menu-item logout-item"
                                onClick={logout}
                            >
                                <span>🚪</span> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;