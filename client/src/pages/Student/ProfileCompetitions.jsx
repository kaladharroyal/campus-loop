import React from 'react';

const ProfileCompetitions = ({
    formData,
    newCompetition,
    setNewCompetition,
    handleAddCompetition,
    handleRemoveCompetition
}) => {
    return (
        <div className="form-section">
            {formData.competitions.length === 0 && (
                <div className="empty-state">
                    <span className="empty-state-icon">👥</span>
                    <h4>No competitions added yet</h4>
                    <p>Add your first competition to showcase your competitive achievements</p>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', padding: '12px 16px', background: '#f8fafc', borderRadius: '4px' }}>
                <input type="checkbox" id="no-competitions" style={{ width: '16px', height: '16px' }} />
                <label htmlFor="no-competitions" style={{ fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>I don't have any competitions</label>
            </div>

            <div className="card-ui" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
                    <div className="icon-wrapper" style={{ backgroundColor: '#f0f4ff', color: '#6366f1', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
                    </div>
                    <h4 style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '700', margin: 0 }}>Add New Competition</h4>
                </div>

                <div className="grid-1" style={{ gap: '20px' }}>
                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Competition Title<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" className="input-outline" value={newCompetition.title} onChange={(e) => setNewCompetition({ ...newCompetition, title: e.target.value })} placeholder="e.g, International Coding Challenge 2024" style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                    </div>

                    <div className="grid-2" style={{ gap: '20px' }}>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Hosted By<span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="text" className="input-outline" value={newCompetition.hostedBy} onChange={(e) => setNewCompetition({ ...newCompetition, hostedBy: e.target.value })} placeholder="e.g, Google, HackerRank" style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Event Date<span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="date" className="input-outline" value={newCompetition.eventDate} onChange={(e) => setNewCompetition({ ...newCompetition, eventDate: e.target.value })} style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                        </div>
                    </div>

                    <div className="grid-2" style={{ gap: '20px' }}>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Mode<span style={{ color: '#ef4444' }}>*</span></label>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '4px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal', fontSize: '0.85rem', color: '#1e293b' }}>
                                    <input type="radio" name="mode" value="Online" style={{ width: '16px', height: '16px' }} /> Online
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal', fontSize: '0.85rem', color: '#1e293b' }}>
                                    <input type="radio" name="mode" value="Offline" style={{ width: '16px', height: '16px' }} /> Offline
                                </label>
                            </div>
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Outcome<span style={{ color: '#ef4444' }}>*</span></label>
                            <select className="input-outline" value={newCompetition.outcome} onChange={(e) => setNewCompetition({ ...newCompetition, outcome: e.target.value })} style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}>
                                <option value="">Select outcome</option>
                                <option value="Winner">Winner</option>
                                <option value="Finalist">Finalist</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Description</label>
                        <textarea className="input-outline" rows="4" placeholder="Describe your competition experience and achievements.." style={{ border: '1px solid #e2e8f0', padding: '12px', resize: 'none' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                        <button className="btn-primary" onClick={handleAddCompetition} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: '600', fontSize: '0.85rem' }}>Add Competition</button>
                    </div>
                </div>
            </div>

            <div className="items-list" style={{ marginTop: '30px' }}>
                {formData.competitions.map((item, index) => (
                    <div key={index} className="card-ui" style={{ padding: '20px', marginBottom: '16px', position: 'relative', border: '1px solid #e2e8f0' }}>
                        <button onClick={() => handleRemoveCompetition(index)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div className="icon-wrapper" style={{ backgroundColor: '#f8fafc', color: '#6366f1', width: '40px', height: '40px' }}>🏅</div>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#1e293b' }}>{item.title}</h4>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#6366f1', fontSize: '0.9rem' }}>{item.hostedBy}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{item.eventDate} • {item.outcome}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileCompetitions;
