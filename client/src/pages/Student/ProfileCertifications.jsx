import React from 'react';

const ProfileCertifications = ({
    formData,
    newCertification,
    setNewCertification,
    handleAddCertification,
    handleRemoveCertification
}) => {
    return (
        <div className="form-section">
            {formData.certifications.length === 0 && (
                <div className="empty-state" style={{ padding: '60px 0' }}>
                    <div className="empty-state-icon" style={{ backgroundColor: '#f8fafc', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', border: '1px solid #f1f5f9' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
                    </div>
                    <h4 style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>No certifications added yet</h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Add your professional certifications to showcase your validated expertise</p>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', padding: '12px 16px', background: '#f8fafc', borderRadius: '4px' }}>
                <input type="checkbox" id="no-certifications" style={{ width: '16px', height: '16px' }} />
                <label htmlFor="no-certifications" style={{ fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>I don't have any certifications</label>
            </div>

            <div className="card-ui" style={{ padding: 0, border: 'none', background: 'transparent' }}>
                <div className="grid-1" style={{ gap: '24px' }}>
                    <div className="grid-2" style={{ gap: '20px' }}>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Title<span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="text" className="input-outline" value={newCertification.title} onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })} style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Issuer<span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="text" className="input-outline" value={newCertification.issuer} onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })} style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Issue Date<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="date" className="input-outline" value={newCertification.issueDate} onChange={(e) => setNewCertification({ ...newCertification, issueDate: e.target.value })} style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Expiry Date<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="date" className="input-outline" style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
                            <input type="checkbox" id="no-expiry" style={{ width: '16px', height: '16px' }} />
                            <label htmlFor="no-expiry" style={{ fontSize: '0.8rem', color: '#64748b', cursor: 'pointer' }}>This certificate does not expire</label>
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Mode<span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '4px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal', fontSize: '0.85rem', color: '#1e293b' }}>
                                <input type="radio" name="cert-mode" value="Online" style={{ width: '16px', height: '16px' }} /> Online
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal', fontSize: '0.85rem', color: '#1e293b' }}>
                                <input type="radio" name="cert-mode" value="Offline" style={{ width: '16px', height: '16px' }} /> Offline
                            </label>
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Credential URL</label>
                        <input type="url" className="input-outline" value={newCertification.credentialUrl} onChange={(e) => setNewCertification({ ...newCertification, credentialUrl: e.target.value })} placeholder="e.g. https://domain.com/cert/123" style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Description</label>
                        <textarea className="input-outline" rows="4" placeholder="Briefly describe what you learned or achieved" style={{ border: '1px solid #e2e8f0', padding: '12px', resize: 'none' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                        <button className="btn-primary" onClick={handleAddCertification} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: '600', fontSize: '0.85rem' }}>Add Certification</button>
                    </div>
                </div>
            </div>

            <div className="items-list" style={{ marginTop: '30px' }}>
                {formData.certifications.map((item, index) => (
                    <div key={index} className="card-ui" style={{ padding: '20px', marginBottom: '16px', position: 'relative', border: '1px solid #e2e8f0' }}>
                        <button onClick={() => handleRemoveCertification(index)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div className="icon-wrapper" style={{ backgroundColor: '#f8fafc', color: '#6366f1', width: '40px', height: '40px' }}>📜</div>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#1e293b' }}>{item.title}</h4>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#6366f1', fontSize: '0.9rem' }}>{item.issuer}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Issued: {item.issueDate}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileCertifications;
