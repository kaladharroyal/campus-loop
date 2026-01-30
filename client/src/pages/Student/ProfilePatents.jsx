import React from 'react';

const ProfilePatents = ({
    formData,
    newPatent,
    setNewPatent,
    handleAddPatent,
    handleRemovePatent
}) => {
    return (
        <div className="form-section">
            {formData.patents.length === 0 && (
                <div className="empty-state" style={{ padding: '60px 0' }}>
                    <div className="empty-state-icon" style={{ backgroundColor: '#f8fafc', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', border: '1px solid #f1f5f9' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="18" r="3" /><line x1="12" y1="15" x2="12" y2="2" /><path d="M12 2a7 7 0 0 1 7 7c0 2.3-1.1 4.3-2.8 5.6M12 2a7 7 0 0 0-7 7c0 2.3 1.1 4.3 2.8 5.6" /></svg>
                    </div>
                    <h4 style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>No patents added yet</h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Add your patents to showcase your innovations and intellectual property</p>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <input type="checkbox" id="no-patents" style={{ width: '16px', height: '16px' }} />
                <label htmlFor="no-patents" style={{ fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>I don't have any patents</label>
            </div>

            <div className="card-ui" style={{ padding: 0, border: 'none', background: 'transparent' }}>
                <div className="grid-1" style={{ gap: '20px' }}>
                    <div className="grid-2" style={{ gap: '20px' }}>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Title<span style={{ color: '#ef4444' }}>*</span></label>
                            <input
                                type="text"
                                className="input-outline"
                                value={newPatent.title}
                                onChange={(e) => setNewPatent({ ...newPatent, title: e.target.value })}
                                style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Office<span style={{ color: '#ef4444' }}>*</span></label>
                            <input
                                type="text"
                                className="input-outline"
                                value={newPatent.office}
                                onChange={(e) => setNewPatent({ ...newPatent, office: e.target.value })}
                                style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Application no.</label>
                        <input
                            type="text"
                            className="input-outline"
                            value={newPatent.applicationNo}
                            onChange={(e) => setNewPatent({ ...newPatent, applicationNo: e.target.value })}
                            style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}
                        />
                    </div>

                    <div className="grid-2" style={{ gap: '20px' }}>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Status<span style={{ color: '#ef4444' }}>*</span></label>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '4px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal', fontSize: '0.85rem', color: '#1e293b' }}>
                                    <input
                                        type="radio"
                                        name="patent-status"
                                        value="Issued"
                                        checked={newPatent.status === 'Issued'}
                                        onChange={(e) => setNewPatent({ ...newPatent, status: e.target.value })}
                                        style={{ width: '16px', height: '16px' }}
                                    /> Issued
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal', fontSize: '0.85rem', color: '#1e293b' }}>
                                    <input
                                        type="radio"
                                        name="patent-status"
                                        value="Pending"
                                        checked={newPatent.status === 'Pending'}
                                        onChange={(e) => setNewPatent({ ...newPatent, status: e.target.value })}
                                        style={{ width: '16px', height: '16px' }}
                                    /> Pending
                                </label>
                            </div>
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Issue date<span style={{ color: '#ef4444' }}>*</span></label>
                            <input
                                type="date"
                                className="input-outline"
                                value={newPatent.issueDate}
                                onChange={(e) => setNewPatent({ ...newPatent, issueDate: e.target.value })}
                                style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Patent URL</label>
                        <input
                            type="url"
                            className="input-outline"
                            value={newPatent.patentUrl}
                            onChange={(e) => setNewPatent({ ...newPatent, patentUrl: e.target.value })}
                            style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Description</label>
                        <textarea
                            className="input-outline"
                            rows="4"
                            value={newPatent.description}
                            onChange={(e) => setNewPatent({ ...newPatent, description: e.target.value })}
                            style={{ border: '1px solid #e2e8f0', padding: '10px 12px', resize: 'none' }}
                        />
                    </div>

                    <div style={{ marginTop: '12px' }}>
                        <button className="btn-primary" onClick={handleAddPatent} style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', fontWeight: '700', fontSize: '0.85rem' }}>Add Patent</button>
                    </div>
                </div>
            </div>

            <div className="items-list" style={{ marginTop: '30px' }}>
                {formData.patents.map((item, index) => (
                    <div key={index} className="card-ui" style={{ padding: '20px', marginBottom: '16px', position: 'relative', border: '1px solid #e2e8f0' }}>
                        <button onClick={() => handleRemovePatent(index)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div className="icon-wrapper" style={{ backgroundColor: '#f8fafc', color: '#6366f1', width: '40px', height: '40px' }}>📜</div>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#1e293b' }}>{item.title}</h4>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#6366f1', fontSize: '0.9rem' }}>{item.office}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{item.issueDate} • {item.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePatents;
