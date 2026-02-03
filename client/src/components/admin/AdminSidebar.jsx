import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * AdminSidebar component
 * Navigation sidebar for admin pages
 */
const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: '📊', label: 'System Overview' },
        { path: '/admin/students', icon: '👨‍🎓', label: 'Student Management' },
        { path: '/admin/teachers', icon: '👨‍🏫', label: 'Faculty Management' },
        { path: '/admin/courses', icon: '📚', label: 'Course Administration' },
        { path: '/admin/assignments', icon: '📝', label: 'Assignment Oversight' },
        { path: '/admin/reports', icon: '📈', label: 'Analytics & Insights' },
        { path: '/admin/settings', icon: '⚙️', label: 'System Configuration' },
    ];

    return (
        <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="admin-sidebar-header">
                <div className="admin-logo">
                    <span className="logo-icon">🎓</span>
                    {!isCollapsed && <span className="logo-text">Admin Panel</span>}
                </div>
                <button
                    className="collapse-btn"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-label="Toggle sidebar"
                >
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="admin-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `admin-nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {!isCollapsed && <span className="nav-label">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="admin-sidebar-footer">
                <button
                    className="admin-logout-btn"
                    onClick={handleLogout}
                >
                    <span className="nav-icon">🚪</span>
                    {!isCollapsed && <span className="nav-label">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;