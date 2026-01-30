import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

/**
 * AdminTopbar Component
 * Top navigation bar for admin dashboard
 */
const AdminTopbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="admin-topbar">
            <div className="admin-topbar-left">
                <h1>Campus Loop LMS</h1>
            </div>

            <div className="admin-topbar-right">
                <div className="admin-profile">
                    <div className="admin-profile-info">
                        <span className="admin-name">
                            {user?.firstName} {user?.lastName}
                        </span>
                        <span className="admin-role">Administrator</span>
                    </div>
                    <div className="admin-avatar">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                </div>

                <button className="admin-logout-btn" onClick={handleLogout}>
                    🚪 Logout
                </button>
            </div>
        </div>
    );
};

export default AdminTopbar;