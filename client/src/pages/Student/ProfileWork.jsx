import React from 'react';

const ProfileWork = ({
    formData,
    newWork,
    setNewWork,
    handleAddWork,
    handleRemoveWork
}) => {
    return (
        <div className="form-section">
            <h3 style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>WORK / INTERNSHIP</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>List all your relevant work/internships experience.</p>

            <div className="card-ui" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '500' }}>I'm yet to find my first Opportunity</span>
            </div>

            <div className="card-ui work-exp-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
                    <div className="icon-wrapper" style={{ backgroundColor: '#f0f4ff', color: '#6366f1', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                    </div>
                    <h4 style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '700', margin: 0 }}>Add Work Experience</h4>
                </div>

                <div className="grid-2">
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Organization<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" className="input-outline" value={newWork.organization} onChange={(e) => setNewWork({ ...newWork, organization: e.target.value })} placeholder="Organization" style={{ border: '1px solid #e2e8f0' }} />
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Role<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" className="input-outline" value={newWork.role} onChange={(e) => setNewWork({ ...newWork, role: e.target.value })} placeholder="Role" style={{ border: '1px solid #e2e8f0' }} />
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Type of Employment<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" style={{ border: '1px solid #e2e8f0' }}>
                            <option value="">Select type</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Internship">Internship</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Industry<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" style={{ border: '1px solid #e2e8f0' }}>
                            <option value="">Select Industry</option>
                            <option value="IT">IT</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>
                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Location</label>
                        <input type="text" className="input-outline" placeholder="Location" style={{ border: '1px solid #e2e8f0' }} />
                    </div>
                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>What skills you have learnt/worked at this work/Internship?<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" style={{ border: '1px solid #e2e8f0' }}>
                            <option value="">Search or Add..</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Start date<span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                            <input type="date" className="input-outline" value={newWork.startDate} onChange={(e) => setNewWork({ ...newWork, startDate: e.target.value })} style={{ border: '1px solid #e2e8f0' }} />
                        </div>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>End date<span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                            <input type="date" className="input-outline" value={newWork.endDate} onChange={(e) => setNewWork({ ...newWork, endDate: e.target.value })} disabled={newWork.currentlyWorking} style={{ border: '1px solid #cbd5e1' }} />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px' }}>
                    <input type="checkbox" checked={newWork.currentlyWorking} onChange={(e) => setNewWork({ ...newWork, currentlyWorking: e.target.checked })} style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '0.85rem', color: '#475569' }}>I'm currently working here</span>
                </div>

                <div className="input-group" style={{ marginTop: '20px' }}>
                    <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Description</label>
                    <textarea className="input-outline" rows="4" value={newWork.description} onChange={(e) => setNewWork({ ...newWork, description: e.target.value })} style={{ border: '1px solid #e2e8f0', resize: 'none' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <button className="btn-primary" onClick={handleAddWork} style={{ background: '#6366f1', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '500' }}>Add Work</button>
                </div>
            </div>

            <div className="items-list" style={{ marginTop: '30px' }}>
                {formData.workExperience.map((work, index) => (
                    <div key={index} className="card-ui" style={{ padding: '20px', marginBottom: '16px', position: 'relative', border: '1px solid #e2e8f0' }}>
                        <button onClick={() => handleRemoveWork(index)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div className="icon-wrapper" style={{ backgroundColor: '#f8fafc', color: '#6366f1', width: '40px', height: '40px' }}>💼</div>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#1e293b' }}>{work.role}</h4>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#6366f1', fontSize: '0.9rem' }}>{work.organization}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{work.startDate} - {work.currentlyWorking ? 'Present' : work.endDate}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileWork;
