import React from 'react';

const ProfileMentoring = ({ formData, handleChange }) => {
    return (
        <div className="form-section">
            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div className="icon-wrapper" style={{ backgroundColor: '#f0f4ff', color: '#6366f1', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: '800', margin: 0 }}>Mentoring Availability</h4>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginLeft: '44px' }}>Toggle your availability to become a mentor and help others in their learning journey</p>
            </div>

            <div className="card-ui" style={{ padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', background: 'transparent' }}>
                <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#1e293b', fontWeight: '600' }}>I'm available to become a mentor</h4>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>
                        When enabled, you'll appear in mentor listings and can receive mentorship requests
                    </p>
                </div>
                <label className="switch" style={{ width: '44px', height: '24px' }}>
                    <input
                        type="checkbox"
                        name="isAvailableForMentoring"
                        checked={formData.isAvailableForMentoring}
                        onChange={(e) => handleChange({ target: { name: 'isAvailableForMentoring', value: e.target.checked } })}
                    />
                    {/* <span className="slider round" style={{ backgroundColor: formData.isAvailableForMentoring ? '#6366f1' : '#f1f5f9', border: '1px solid #e2e8f0' }}></span> */}
                </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '40px' }}>
                <button className="btn-secondary" style={{ padding: '8px 20px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontWeight: '500', fontSize: '0.9rem' }}>Cancel</button>
                <button className="btn-primary" style={{ padding: '8px 20px', borderRadius: '6px', background: '#1e293b', color: '#fff', fontWeight: '600', border: 'none', fontSize: '0.9rem' }}>Save Mentoring Profile</button>
            </div>
        </div>
    );
};

export default ProfileMentoring;
