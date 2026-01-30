import React from 'react';

const ProfilePublications = ({
    formData,
    newPublication,
    setNewPublication,
    handleAddPublication,
    handleRemovePublication
}) => {
    return (
        <div className="form-section">
            {formData.publications.length === 0 && (
                <div className="empty-state" style={{ padding: '60px 0' }}>
                    <div className="empty-state-icon" style={{ backgroundColor: '#f8fafc', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', border: '1px solid #f1f5f9' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                    </div>
                    <h4 style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>No publications added yet</h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Add your research papers and publications to showcase your academic contributions</p>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <input type="checkbox" id="no-publications" style={{ width: '16px', height: '16px' }} />
                <label htmlFor="no-publications" style={{ fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>I've not published any paper</label>
            </div>

            <div className="card-ui" style={{ padding: 0, border: 'none', background: 'transparent' }}>
                <div className="grid-1" style={{ gap: '20px' }}>
                    <div className="grid-2" style={{ gap: '20px' }}>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Title<span style={{ color: '#ef4444' }}>*</span></label>
                            <input
                                type="text"
                                className="input-outline"
                                value={newPublication.title}
                                onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })}
                                placeholder=""
                                style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Publisher<span style={{ color: '#ef4444' }}>*</span></label>
                            <input
                                type="text"
                                className="input-outline"
                                value={newPublication.publisher}
                                onChange={(e) => setNewPublication({ ...newPublication, publisher: e.target.value })}
                                placeholder=""
                                style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Publish date<span style={{ color: '#ef4444' }}>*</span></label>
                        <input
                            type="date"
                            className="input-outline"
                            value={newPublication.publishDate}
                            onChange={(e) => setNewPublication({ ...newPublication, publishDate: e.target.value })}
                            style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Publication Link</label>
                        <input
                            type="url"
                            className="input-outline"
                            value={newPublication.link}
                            onChange={(e) => setNewPublication({ ...newPublication, link: e.target.value })}
                            placeholder=""
                            style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Description</label>
                        <textarea
                            className="input-outline"
                            rows="4"
                            value={newPublication.description}
                            onChange={(e) => setNewPublication({ ...newPublication, description: e.target.value })}
                            placeholder=""
                            style={{ border: '1px solid #e2e8f0', padding: '10px 12px', resize: 'none' }}
                        />
                    </div>

                    <div style={{ marginTop: '12px' }}>
                        <button className="btn-primary" onClick={handleAddPublication} style={{ background: '#000', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: '700', fontSize: '0.85rem' }}>Add Publication</button>
                    </div>
                </div>
            </div>

            <div className="items-list" style={{ marginTop: '30px' }}>
                {formData.publications.map((item, index) => (
                    <div key={index} className="card-ui" style={{ padding: '20px', marginBottom: '16px', position: 'relative', border: '1px solid #e2e8f0' }}>
                        <button onClick={() => handleRemovePublication(index)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div className="icon-wrapper" style={{ backgroundColor: '#f8fafc', color: '#6366f1', width: '40px', height: '40px' }}>📄</div>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#1e293b' }}>{item.title}</h4>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#6366f1', fontSize: '0.9rem' }}>{item.publisher}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Published: {item.publishDate}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePublications;
