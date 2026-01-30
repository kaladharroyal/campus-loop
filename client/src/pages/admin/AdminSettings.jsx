import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css'

/**
 * AdminSettings component
 * System configuration and admin profile settings
 */
const AdminSettings = () => {
    const { user, updateProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        try {
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone
            };

            if (formData.newPassword) {
                if (formData.newPassword !== formData.confirmPassword) {
                    setMessage('Passwords do not match');
                    return;
                }
                updateData.password = formData.newPassword;
            }

            await updateProfile(updateData);
            setMessage('Profile updated successfully!');

            // Clear password fields
            setFormData({
                ...formData,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            setMessage('Error: ' + err.message);
        }
    };

    return (
        <div className="admin-settings">
            <div className="page-header">
                <h1>Settings</h1>
                <p>Manage your admin account and system preferences</p>
            </div>

            {/* Tabs */}
            <div className="settings-tabs">
                <button
                    className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    👤 Profile Settings
                </button>
                <button
                    className={`tab-btn ${activeTab === 'system' ? 'active' : ''}`}
                    onClick={() => setActiveTab('system')}
                >
                    ⚙️ System Settings
                </button>
                <button
                    className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notifications')}
                >
                    🔔 Notifications
                </button>
            </div>

            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
                <div className="settings-content">
                    <h2>Profile Information</h2>

                    {message && (
                        <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleProfileUpdate} className="settings-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>


                        <h3>Change Password</h3>

                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="form-control"
                                minLength="6"
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <button type="submit" className="btn-primary">
                            Save Changes
                        </button>
                    </form>
                </div>
            )}

            {/* System Settings Tab */}
            {activeTab === 'system' && (
                <div className="settings-content">
                    <h2>System Configuration</h2>
                    <div className="system-settings-grid">
                        <div className="setting-item">
                            <h3>Email Configuration</h3>
                            <p>Configure SMTP settings for system emails</p>
                            <button className="btn-secondary">Configure</button>
                        </div>

                        <div className="setting-item">
                            <h3>Backup & Restore</h3>
                            <p>Manage database backups and restoration</p>
                            <button className="btn-secondary">Manage Backups</button>
                        </div>

                        <div className="setting-item">
                            <h3>Security Settings</h3>
                            <p>Configure authentication and security policies</p>
                            <button className="btn-secondary">Configure</button>
                        </div>

                        <div className="setting-item">
                            <h3>Data Export</h3>
                            <p>Export system data for reporting and analysis</p>
                            <button className="btn-secondary">Export Data</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
                <div className="settings-content">
                    <h2>Notification Preferences</h2>
                    <div className="notification-settings">
                        <div className="notification-item">
                            <label className="checkbox-label">
                                <input type="checkbox" defaultChecked />
                                <span>Email notifications for new user registrations</span>
                            </label>
                        </div>

                        <div className="notification-item">
                            <label className="checkbox-label">
                                <input type="checkbox" defaultChecked />
                                <span>Email notifications for system alerts</span>
                            </label>
                        </div>

                        <div className="notification-item">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>Daily summary reports</span>
                            </label>
                        </div>

                        <div className="notification-item">
                            <label className="checkbox-label">
                                <input type="checkbox" defaultChecked />
                                <span>Assignment submission notifications</span>
                            </label>
                        </div>

                        <button className="btn-primary save-stn">Save Preferences</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSettings;