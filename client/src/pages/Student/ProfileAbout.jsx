import React from 'react';

const ProfileAbout = ({ formData, handleChange, handleFileChange }) => {
    return (
        <div className="form-section">
            {/* Profile Picture Card */}
            <div className="card-ui profile-picture-card" style={{ marginBottom: '20px' }}>
                <div className="card-header-ui">
                    <h3>Profile Picture</h3>
                </div>
                <div className="card-body-ui" style={{ display: 'flex', alignItems: 'center', gap: '40px', padding: '10px 0' }}>
                    <div className="profile-pic-container" style={{
                        width: '120px', height: '120px', borderRadius: '50%',
                        backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', border: '1px solid #e2e8f0', position: 'relative'
                    }}>
                        {formData.profilePicture ? (
                            <img src={formData.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ color: '#94a3b8', textAlign: 'center' }}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '15px' }}>Click or drag and drop to upload your profile picture</p>
                        <input
                            type="file"
                            id="profile-upload"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="profile-upload" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                            Upload Photo
                        </label>
                    </div>
                </div>
            </div>

            {/* Personal Details Card */}
            <div className="card-ui personal-details-card" style={{ borderLeft: '4px solid #06b6d4', marginBottom: '20px' }}>
                <div className="card-header-ui" style={{ border: 'none', paddingBottom: '10px' }}>
                    <span className="icon-wrapper" style={{ backgroundColor: '#ecfeff', color: '#0891b2' }}>👤</span>
                    <h3 style={{ fontSize: '1.1rem', color: '#1e293b' }}>Personal Details</h3>
                </div>
                <div className="card-body-ui">
                    <div className="input-group" style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Full Name<span style={{ color: '#ef4444' }}>*</span></label>
                        <input
                            type="text"
                            className="input-outline"
                            name="fullName"
                            value={`${formData.firstName} ${formData.lastName}`.trim()}
                            readOnly
                            style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Gender<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" name="gender" value={formData.gender} onChange={handleChange} style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Birthday Card */}
            <div className="card-ui birthday-card" style={{ borderLeft: '4px solid #8b5cf6', marginBottom: '20px' }}>
                <div className="card-header-ui" style={{ border: 'none', paddingBottom: '10px' }}>
                    <span className="icon-wrapper" style={{ backgroundColor: '#f5f3ff', color: '#7c3aed' }}>🎂</span>
                    <h3 style={{ fontSize: '1.1rem', color: '#1e293b' }}>Birthday</h3>
                </div>
                <div className="card-body-ui">
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Date of Birth</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="date"
                                className="input-outline"
                                name="dob"
                                value={formData.dob ? formData.dob.split('T')[0] : ''}
                                onChange={handleChange}
                                style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* About You Card */}
            <div className="card-ui about-you-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <div className="card-header-ui" style={{ border: 'none', paddingBottom: '10px' }}>
                    <span className="icon-wrapper" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>💡</span>
                    <h3 style={{ fontSize: '1.1rem', color: '#1e293b' }}>About You</h3>
                </div>
                <div className="card-body-ui">
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Short Bio<span style={{ color: '#ef4444' }}>*</span></label>
                        <textarea
                            className="input-outline"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Showcase your uniqueness in a short bio"
                            style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileAbout;
