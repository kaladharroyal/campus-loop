import React, { useState, useEffect } from 'react';
import '../styles/pages.css';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // State for form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        branch: '',
        year: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        if (user) {
            // Use explicit fields if available, otherwise fallback (though backend should now have them)
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                branch: user.branch || '',
                year: user.year || '',
                phone: user.phone || '',
                email: user.email || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await updateProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                branch: formData.branch,
                year: formData.year,
                phone: formData.phone,
                email: formData.email
            });
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="page-container">
            <div className="profile-page-content">
                <div className="profile-pic-large">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <p className="profile-caption">Profile picture</p>

                <div className="profile-form">
                    <div className="input-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            className="input-outline"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="input-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            className="input-outline"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="input-group">
                        <label>Branch:</label>
                        <input
                            type="text"
                            name="branch"
                            className="input-outline"
                            value={formData.branch}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder={isEditing ? "e.g. CSE" : ""}
                        />
                    </div>

                    <div className="input-group">
                        <label>Year:</label>
                        <input
                            type="text"
                            name="year"
                            className="input-outline"
                            value={formData.year}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder={isEditing ? "e.g. 3" : ""}
                        />
                    </div>

                    <div className="input-group">
                        <label>Phone number</label>
                        <input
                            type="text"
                            name="phone"
                            className="input-outline"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="input-group">
                        <label>E-mail:</label>
                        <input
                            type="email"
                            name="email"
                            className="input-outline"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {isEditing ? (
                        <button className="edit-btn" style={{ background: '#22c55e' }} onClick={handleSave}>Save Profile</button>
                    ) : (
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit your profile</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
