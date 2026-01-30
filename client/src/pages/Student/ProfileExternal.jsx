import React, { useState } from 'react';

const ProfileExternal = ({ formData, handleSocialChange }) => {
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [editingPlatform, setEditingPlatform] = useState(null);

    const platforms = [
        { id: 'linkedin', label: 'LinkedIn', icon: '👤', color: '#0a66c2' },
        { id: 'github', label: 'GitHub', icon: '📁', color: '#24292e' },
        { id: 'twitter', label: 'Twitter', icon: '🐦', color: '#1da1f2' },
        { id: 'instagram', label: 'Instagram', icon: '📸', color: '#e4405f' },
        { id: 'leetcode', label: 'LeetCode', icon: '💻', color: '#ffa116' },
        { id: 'website', label: 'Website', icon: '🌐', color: '#6366f1' }
    ];

    const handleAddClick = (platformId) => {
        setEditingPlatform(platformId);
        setShowAddMenu(false);
    };

    const handleRemove = (platformId) => {
        handleSocialChange({ target: { name: platformId, value: '' } });
    };

    return (
        <div className="form-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#1e293b', fontWeight: '700', margin: 0 }}>Your External Profiles</h3>
                <div style={{ position: 'relative' }}>
                    <button
                        className="btn-primary"
                        onClick={() => setShowAddMenu(!showAddMenu)}
                        style={{ background: '#1e293b', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <span style={{ fontSize: '1.1rem' }}>+</span> Add profile
                    </button>
                    {showAddMenu && (
                        <div className="card-ui" style={{
                            position: 'absolute', top: '100%', right: '0', zIndex: '10',
                            padding: '8px', minWidth: '180px', marginTop: '8px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', border: '1px solid #f1f5f9'
                        }}>
                            {platforms.map(p => (
                                !formData.socialLinks[p.id] && (
                                    <div
                                        key={p.id}
                                        onClick={() => handleAddClick(p.id)}
                                        style={{ padding: '8px 12px', fontSize: '0.85rem', cursor: 'pointer', borderRadius: '4px', color: '#475569' }}
                                        className="nav-item-hover"
                                    >
                                        {p.label}
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
                Connect and showcase your professional profiles to stand out.
            </p>

            {editingPlatform && (
                <div className="card-ui" style={{ padding: '24px', marginBottom: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '700', marginBottom: '16px' }}>Add {platforms.find(p => p.id === editingPlatform)?.label} Profile</h4>
                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px', display: 'block' }}>Profile URL</label>
                        <input
                            type="url"
                            className="input-outline"
                            name={editingPlatform}
                            value={formData.socialLinks[editingPlatform] || ''}
                            onChange={(e) => handleSocialChange(e)}
                            placeholder={`https://${editingPlatform}.com/username`}
                            style={{ background: '#fff' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                        <button className="btn-primary" onClick={() => setEditingPlatform(null)} style={{ background: '#1e293b', border: 'none', padding: '8px 24px', borderRadius: '6px', fontSize: '0.85rem' }}>Done</button>
                        <button className="btn-secondary" onClick={() => { handleRemove(editingPlatform); setEditingPlatform(null); }} style={{ padding: '8px 24px', fontSize: '0.85rem' }}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="external-profiles-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {platforms.map(p => {
                    const link = formData.socialLinks[p.id];
                    if (!link || p.id === editingPlatform) return null;

                    return (
                        <div key={p.id} className="card-ui profile-card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem' }}>
                                    {p.id === 'linkedin' ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    ) : p.id === 'leetcode' ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-4.323 4.32a1.09 1.09 0 0 0 0 1.556 1.09 1.09 0 0 0 1.556 0l4.323-4.32A.45.45 0 0 1 13.483.1h.001zm-5.636 3.116L5.05 5.914a1.09 1.09 0 0 0 1.556 1.556l2.803-2.802a1.09 1.09 0 0 0-1.556-1.556zM8.847 9.148l-1.556 1.556a1.09 1.09 0 1 0 1.556 1.556l1.556-1.556a1.09 1.09 0 1 0-1.556-1.556zm-.437-4.436L4.087 9.034a1.09 1.09 0 1 0 1.556 1.556l4.323-4.323a1.09 1.09 0 1 0-1.556-1.556zM13.483 23.9a1.374 1.374 0 0 0 .961-.414l7.94-7.94a1.374 1.374 0 0 0 0-1.943L14.444 5.663a1.374 1.374 0 0 0-1.943 0L3.56 14.603a1.374 1.374 0 0 0 0 1.942l7.941 7.941a1.374 1.374 0 0 0 .982.414zm.001-23.8h.001l7.941 7.94a1.374 1.374 0 0 1 0 1.943l-7.94 7.94a1.374 1.374 0 0 1-1.943 0l-7.941-7.941a1.374 1.374 0 0 1 0-1.942l7.94-7.94a1.374 1.374 0 0 1 .983-.414z" /></svg>
                                    ) : (
                                        p.icon
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '600' }}>{p.label}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{link}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                {p.id === 'leetcode' && (
                                    <button style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '500' }}>Verify</button>
                                )}
                                <button className="btn-icon" onClick={() => setEditingPlatform(p.id)} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                </button>
                                <button className="btn-icon" onClick={() => handleRemove(p.id)} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfileExternal;
