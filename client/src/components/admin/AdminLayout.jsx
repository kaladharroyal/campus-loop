import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import '../../styles/admin.css';

/**
 * AdminLayout Component
 * Main layout wrapper for all admin pages
 * Includes sidebar and topbar
 */
const AdminLayout = () => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`admin-layout ${isCollapsed ? 'collapsed-mode' : ''}`}>
            <AdminSidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
            <div className="admin-main">
                <AdminTopbar />
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;