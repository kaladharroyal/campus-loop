import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/admin.css';

/**
 * AdminSidebar Component
 * Navigation sidebar for admin dashboard
 */
const AdminSidebar = ({ isCollapsed, onToggle }) => {
    return (
        <div className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className={`admin-sidebar-header ${isCollapsed ? 'collapsed-header' : ''}`}>
                <div className="brand-wrapper">
                    {!isCollapsed && <h2>🎓 Admin Panel</h2>}
                    {isCollapsed && <span className="icon admin-logo-collapsed">🎓</span>}
                </div>
                <button
                    className="sidebar-toggle"
                    onClick={onToggle}
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    <span className="hamburger-icon">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </span>
                </button>
            </div>

            <nav className="admin-nav">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
                    title="Dashboard"
                >
                    <span className="icon">📊</span>
                    {!isCollapsed && <span>Dashboard</span>}
                </NavLink>

                <NavLink
                    to="/admin/students"
                    className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
                    title="Students"
                >
                    <span className="icon">👨‍🎓</span>
                    {!isCollapsed && <span>Students</span>}
                </NavLink>

                <NavLink
                    to="/admin/teachers"
                    className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
                    title="Teachers"
                >
                    <span className="icon">👨‍🏫</span>
                    {!isCollapsed && <span>Teachers</span>}
                </NavLink>

                <NavLink
                    to="/admin/courses"
                    className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
                    title="Courses"
                >
                    <span className="icon">📚</span>
                    {!isCollapsed && <span>Courses</span>}
                </NavLink>

                <NavLink
                    to="/admin/assignments"
                    className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
                    title="Assignments"
                >
                    <span className="icon">📝</span>
                    {!isCollapsed && <span>Assignments</span>}
                </NavLink>

                <NavLink
                    to="/admin/reports"
                    className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
                    title="Reports"
                >
                    <span className="icon">📈</span>
                    {!isCollapsed && <span>Reports</span>}
                </NavLink>

                <NavLink
                    to="/admin/settings"
                    className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
                    title="Settings"
                >
                    <span className="icon">⚙️</span>
                    {!isCollapsed && <span>Settings</span>}
                </NavLink>
            </nav>
        </div>
    );
};

export default AdminSidebar;