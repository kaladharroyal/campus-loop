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
        email: '',
        profilePicture: ''
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
                email: user.email || '',
                profilePicture: user.profilePicture || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePicture: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            await updateProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                branch: formData.branch,
                year: formData.year,
                phone: formData.phone,
                email: formData.email,
                profilePicture: formData.profilePicture
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
                <div className="profile-pic-section" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                    <div className="profile-pic-large" style={{
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundImage: formData.profilePicture ? `url(${formData.profilePicture})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        marginBottom: 0
                    }}>
                        {!formData.profilePicture && (user?.name ? user.name.charAt(0).toUpperCase() : 'U')}
                    </div>

                    {isEditing && (
                        <div className="profile-upload-action">
                            <input
                                type="file"
                                id="profile-upload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="profile-upload" style={{
                                fontSize: '2rem',
                                cursor: 'pointer',
                                padding: '10px',
                                background: 'transparent',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} title="Upload Profile Picture">
                                📷
                            </label>
                        </div>
                    )}
                </div>
                <p className="profile-caption" style={{ marginBottom: '50px' }}>Profile picture</p>

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
