import React from 'react';
import '../../styles/admin.css'

/**
 * AdminSettings Component
 * System settings and configuration
 */
const AdminSettings = () => {
    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Admin Settings</h1>
                <p>Configure system settings and preferences</p>
            </div>

            <div className="admin-settings-grid">
                <div className="admin-form-card">
                    <h3>🎓 Academic Year Settings</h3>
                    <div className="admin-form">
                        <label>Current Academic Year</label>
                        <input type="text" className="admin-input" placeholder="2025-2026" />

                        <label>Semester</label>
                        <select className="admin-input">
                            <option>Fall 2025</option>
                            <option>Spring 2026</option>
                        </select>

                        <button className="admin-btn admin-btn-success">Save Changes</button>
                    </div>
                </div>

                <div className="admin-form-card">
                    <h3>🏛️ Branches/Departments</h3>
                    <div className="admin-form">
                        <label>Available Branches</label>
                        <textarea
                            className="admin-input"
                            rows="5"
                            placeholder="Computer Science&#10;Information Technology&#10;Electronics&#10;Mechanical&#10;Civil"
                        ></textarea>
                        <button className="admin-btn admin-btn-success">Update Branches</button>
                    </div>
                </div>

                <div className="admin-form-card">
                    <h3>📧 Email Notifications</h3>
                    <div className="admin-form">
                        <label className="checkbox-label">
                            <input type="checkbox" /> Send welcome emails to new users
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" /> Send assignment reminders
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" /> Send attendance notifications
                        </label>
                        <button className="admin-btn admin-btn-success">Save Preferences</button>
                    </div>
                </div>

                <div className="admin-form-card">
                    <h3>🔒 Security Settings</h3>
                    <div className="admin-form">
                        <label>Session Timeout (minutes)</label>
                        <input type="number" className="admin-input" defaultValue="30" />

                        <label>Password Minimum Length</label>
                        <input type="number" className="admin-input" defaultValue="8" />

                        <button className="admin-btn admin-btn-success">Update Security</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
