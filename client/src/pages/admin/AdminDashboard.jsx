import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/admin.css'

/**
 * AdminDashboard Component
 * Main dashboard for administrators showing key statistics and recent activity
 */
const AdminDashboard = () => {
    const [analytics, setAnalytics] = useState({
        stats: {
            totalStudents: 0,
            totalTeachers: 0,
            totalCourses: 0,
            activeUsers: 0
        },
        recentRegistrations: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch('/api/admin/analytics', {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAnalytics(data);
            }
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading dashboard...</div>;
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-page-header">
                <h1>Dashboard Overview</h1>
                <p>Welcome to the Campus Loop Admin Panel</p>
            </div>

            {/* Statistics Cards */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'var(--primary)' }}>
                        👨‍🎓
                    </div>
                    <div className="stat-details">
                        <h3>Total Students</h3>
                        <p className="stat-number">{analytics.stats.totalStudents}</p>
                        <Link to="/admin/students" className="stat-link">View All →</Link>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'var(--color-success)' }}>
                        👨‍🏫
                    </div>
                    <div className="stat-details">
                        <h3>Total Teachers</h3>
                        <p className="stat-number">{analytics.stats.totalTeachers}</p>
                        <Link to="/admin/teachers" className="stat-link">View All →</Link>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'var(--color-warning)' }}>
                        📚
                    </div>
                    <div className="stat-details">
                        <h3>Total Courses</h3>
                        <p className="stat-number">{analytics.stats.totalCourses}</p>
                        <Link to="/admin/courses" className="stat-link">View All →</Link>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'var(--primary-dark)' }}>
                        ✓
                    </div>
                    <div className="stat-details">
                        <h3>Active Users</h3>
                        <p className="stat-number">{analytics.stats.activeUsers}</p>
                        <span className="stat-link">All Roles</span>
                    </div>
                </div>
            </div>

            {/* Recent Registrations */}
            <div className="admin-section">
                <h2>Recent Registrations</h2>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Registered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analytics.recentRegistrations.length > 0 ? (
                                analytics.recentRegistrations.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`role-badge ${user.role}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>
                                        No recent registrations
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="admin-section">
                <h2>Quick Actions</h2>
                <div className="quick-actions-grid">
                    <Link to="/admin/teachers" className="quick-action-card">
                        <span>➕</span>
                        <p>Add Teacher</p>
                    </Link>
                    <Link to="/admin/courses" className="quick-action-card">
                        <span>📚</span>
                        <p>Create Course</p>
                    </Link>
                    <Link to="/admin/reports" className="quick-action-card">
                        <span>📊</span>
                        <p>View Reports</p>
                    </Link>
                    <Link to="/admin/settings" className="quick-action-card">
                        <span>⚙️</span>
                        <p>Settings</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
