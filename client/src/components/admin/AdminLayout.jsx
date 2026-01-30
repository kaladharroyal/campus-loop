import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin-layout.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

/**
 * AdminLayout component
 * Provides consistent layout for all admin pages
 * Includes sidebar navigation and topbar
 */
const AdminLayout = ({ children }) => {
    const { user } = useAuth();

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main-content">
                <AdminTopbar user={user} />
                <main className="admin-page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;