import React from 'react';

const ProfileAchievements = ({
    formData,
    newAchievement,
    setNewAchievement,
    handleAddAchievement,
    handleRemoveAchievement
}) => {
    return (
        <div className="form-section">
            {formData.achievements.length === 0 && (
                <div className="empty-state">
                    <span className="empty-state-icon">🏆</span>
                    <h4>No achievements added yet</h4>
                    <p>Add your first achievement to showcase your accomplishments</p>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', padding: '12px 16px', background: '#f8fafc', borderRadius: '4px' }}>
                <input type="checkbox" id="no-achievements" style={{ width: '16px', height: '16px' }} />
                <label htmlFor="no-achievements" style={{ fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>I don't have any achievements</label>
            </div>

            <div className="card-ui" style={{ padding: 0, border: 'none', background: 'transparent' }}>
                <div className="grid-1" style={{ gap: '20px' }}>
                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Title<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" className="input-outline" value={newAchievement.title} onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })} placeholder="e.g, First Place in National Coding Competition" style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                    </div>

                    <div className="grid-2" style={{ gap: '20px' }}>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Issuer<span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="text" className="input-outline" value={newAchievement.issuer} onChange={(e) => setNewAchievement({ ...newAchievement, issuer: e.target.value })} placeholder="e.g, IEEE, ACM, University" style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Issue Date<span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="date" className="input-outline" value={newAchievement.issueDate} onChange={(e) => setNewAchievement({ ...newAchievement, issueDate: e.target.value })} style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Description</label>
                        <textarea className="input-outline" rows="4" value={newAchievement.description} onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })} placeholder="Describe your achievement and its significance.." style={{ border: '1px solid #e2e8f0', padding: '12px', resize: 'none' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                        <button className="btn-primary" onClick={handleAddAchievement} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: '600', fontSize: '0.85rem' }}>Add Achievement</button>
                    </div>
                </div>
            </div>

            <div className="items-list" style={{ marginTop: '30px' }}>
                {formData.achievements.map((item, index) => (
                    <div key={index} className="card-ui" style={{ padding: '20px', marginBottom: '16px', position: 'relative', border: '1px solid #e2e8f0' }}>
                        <button onClick={() => handleRemoveAchievement(index)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div className="icon-wrapper" style={{ backgroundColor: '#f8fafc', color: '#6366f1', width: '40px', height: '40px' }}>🏆</div>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#1e293b' }}>{item.title}</h4>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#6366f1', fontSize: '0.9rem' }}>{item.issuer}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{item.issueDate}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileAchievements;
