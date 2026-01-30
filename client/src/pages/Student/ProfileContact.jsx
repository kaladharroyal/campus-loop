import React from 'react';

const ProfileContact = ({
    formData,
    handleChange,
    handleParentChange,
    handleSameAddressChange,
    handleSocialChange
}) => {
    return (
        <div className="form-section">
            {/* Contact Details Section */}
            <div className="form-inner-container">
                <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '8px', fontWeight: '600' }}>CONTACT DETAILS</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>Manage your contact information</p>

                {/* Email Information */}
                <div className="form-sub-section" style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>Email Information</h4>

                    <div className="input-group" style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '1rem' }}>📧</span> Primary Email Address
                        </label>
                        <input
                            type="email"
                            className="input-outline"
                            value={formData.email}
                            disabled
                            style={{ backgroundColor: '#f8fafc', color: '#94a3b8', border: '1px solid #e2e8f0' }}
                        />
                        <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '4px' }}>This is your primary email and cannot be changed here</p>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '1rem' }}>📧</span> Secondary Email Address <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="email"
                                className="input-outline"
                                name="secondaryEmail"
                                value={formData.secondaryEmail}
                                onChange={handleChange}
                                placeholder="Enter your secondary email"
                                style={{ flex: 1, border: '1px solid #e2e8f0' }}
                            />
                            <button className="btn-secondary" style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '6px', fontSize: '0.85rem' }}>Verify</button>
                        </div>
                    </div>
                </div>

                {/* Phone Information */}
                <div className="form-sub-section" style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>Phone Information</h4>

                    <div className="grid-2">
                        <div className="input-group">
                            <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '1rem' }}>📞</span> Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 10px', display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', fontSize: '0.9rem', color: '#64748b' }}>+91</div>
                                <input
                                    type="tel"
                                    className="input-outline"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    style={{ flex: 1, border: '1px solid #e2e8f0' }}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '1rem' }}>📞</span> Alternate Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 10px', display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', fontSize: '0.9rem', color: '#64748b' }}>+91</div>
                                <input
                                    type="tel"
                                    className="input-outline"
                                    name="alternatePhone"
                                    value={formData.alternatePhone}
                                    onChange={handleChange}
                                    placeholder="Enter 10 digit mobile number"
                                    style={{ flex: 1, border: '1px solid #e2e8f0' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="form-sub-section" style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>Address Information</h4>

                    <div className="input-group" style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '1rem' }}>📍</span> Permanent Address <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <textarea
                            className="input-outline"
                            name="permanentAddress"
                            value={formData.permanentAddress}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter your permanent address"
                            style={{ border: '1px solid #e2e8f0' }}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '1rem' }}>📍</span> Current Address <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <input
                                type="checkbox"
                                id="sameAddress"
                                checked={formData.currentAddressSame}
                                onChange={handleSameAddressChange}
                                style={{ width: '16px', height: '16px' }}
                            />
                            <label htmlFor="sameAddress" style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 0 }}>Same as permanent address</label>
                        </div>
                        <textarea
                            className="input-outline"
                            name="currentAddress"
                            value={formData.currentAddress}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter your current address"
                            disabled={formData.currentAddressSame}
                            style={{ border: '1px solid #e2e8f0', backgroundColor: formData.currentAddressSame ? '#f8fafc' : '#fff' }}
                        />
                    </div>
                </div>

                {/* Parent/Guardian Information */}
                <div className="form-sub-section">
                    <h4 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>Parent/Guardian Information</h4>

                    <div className="grid-2">
                        <div className="input-group">
                            <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '1rem' }}>👤</span> Father's Name <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="input-outline"
                                name="fatherName"
                                value={formData.parentDetails.fatherName}
                                onChange={handleParentChange}
                                placeholder="Enter father's name"
                                style={{ border: '1px solid #e2e8f0' }}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '1rem' }}>💼</span> Father's Occupation <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="input-outline"
                                name="fatherOccupation"
                                value={formData.parentDetails.fatherOccupation}
                                onChange={handleParentChange}
                                placeholder="Enter father's occupation"
                                style={{ border: '1px solid #e2e8f0' }}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '1rem' }}>👤</span> Mother's Name <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="input-outline"
                                name="motherName"
                                value={formData.parentDetails.motherName}
                                onChange={handleParentChange}
                                placeholder="Enter mother's name"
                                style={{ border: '1px solid #e2e8f0' }}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '1rem' }}>💼</span> Mother's Occupation <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="input-outline"
                                name="motherOccupation"
                                value={formData.parentDetails.motherOccupation}
                                onChange={handleParentChange}
                                placeholder="Enter mother's occupation"
                                style={{ border: '1px solid #e2e8f0' }}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '1rem' }}>📞</span> Parent Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0 10px', display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', fontSize: '0.9rem', color: '#64748b' }}>+91</div>
                                <input
                                    type="tel"
                                    className="input-outline"
                                    name="parentPhone"
                                    value={formData.parentDetails.parentPhone}
                                    onChange={handleParentChange}
                                    placeholder="Enter 10 digit mobile number"
                                    style={{ flex: 1, border: '1px solid #e2e8f0' }}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '1rem' }}>✉️</span> Parent Email ID <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="email"
                                className="input-outline"
                                name="parentEmail"
                                value={formData.parentDetails.parentEmail}
                                onChange={handleParentChange}
                                placeholder="Enter parent's email (if any)"
                                style={{ border: '1px solid #e2e8f0' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-actions" style={{ marginTop: '32px' }}>
                    <button className="btn-save" style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileContact;
