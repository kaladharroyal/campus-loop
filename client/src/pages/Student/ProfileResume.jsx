import React from 'react';

const ProfileResume = ({ formData, handleChange }) => {
    return (
        <div className="form-section">
            <h3 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>Upload your resume here</h3>

            <div className="card-ui resume-upload-card" style={{ padding: '0' }}>
                <div style={{
                    border: '1px dashed #cbd5e1',
                    borderRadius: '12px',
                    padding: '60px 40px',
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px solid #1e293b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        color: '#1e293b'
                    }}>
                        +
                    </div>
                    <div>
                        <span style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '500' }}>Drag & drop here</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>* Only PDF files under 2MB are accepted</p>
            </div>

            {formData.resume && (
                <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '1.5rem' }}>📄</span>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: '500' }}>Resume.pdf</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Uploaded successfully</div>
                        </div>
                    </div>
                    <a href={formData.resume} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                        Preview
                    </a>
                </div>
            )}
        </div>
    );
};

export default ProfileResume;
