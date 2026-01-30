import React from 'react';

const ProfileLanguages = ({
    formData,
    newLanguage,
    setNewLanguage,
    handleAddLanguage,
    handleRemoveLanguage
}) => {
    return (
        <div className="form-section">
            <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>LANGUAGES</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Add the languages you know and your proficiency level</p>
            </div>

            <div className="card-ui" style={{ padding: 0, border: 'none', background: 'transparent', marginBottom: '32px' }}>
                <div className="grid-1" style={{ gap: '20px' }}>
                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Your Language</label>
                        <input
                            type="text"
                            className="input-outline"
                            value={newLanguage.language}
                            onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
                            style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}
                        />
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px', fontWeight: '500' }}>Level</label>
                        <select
                            className="input-outline"
                            value={newLanguage.level}
                            onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
                            style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }}
                        >
                            <option value="">Select..</option>
                            <option value="Native">Native</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Conversational">Conversational</option>
                            <option value="Beginner">Beginner</option>
                        </select>
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button className="btn-primary" onClick={handleAddLanguage} style={{ background: '#000', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: '700', fontSize: '0.85rem' }}>Add Language</button>
                </div>
            </div>

            <div className="languages-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {formData.languages.map((item, index) => (
                    <div key={index} className="language-badge" style={{
                        background: '#fff',
                        padding: '8px 16px',
                        borderRadius: '30px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>{item.language}</span>
                            <span style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: '500' }}>{item.level}</span>
                        </div>
                        <button
                            onClick={() => handleRemoveLanguage(index)}
                            style={{ border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem', padding: '0 4px' }}
                        >×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileLanguages;
