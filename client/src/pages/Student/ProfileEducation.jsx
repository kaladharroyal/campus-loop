import React from 'react';

const ProfileEducation = ({ formData, handleEducationChange, handleScoreChange }) => {
    return (
        <div className="form-section">
            {/* Academic Summary Header */}
            <div className="card-ui education-summary-card" style={{ marginBottom: '20px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="icon-wrapper" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🎓</div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {formData.currentEducation.department}
                            </h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>2026 — 2027</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#10b981' }}>9.20</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>CGPA</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#3b82f6' }}>84.5%</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Percentage</div>
                        </div>
                        <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Edit Info</button>
                    </div>
                </div>

                <div className="grid-2" style={{ marginTop: '30px', gap: '30px' }}>
                    <div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Institution:</label>
                            <div style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '500' }}>{formData.currentEducation.institution}</div>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Department:</label>
                            <div style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '500' }}>{formData.currentEducation.department}</div>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Passout Batch:</label>
                            <div style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '500' }}>{formData.currentEducation.passoutBatch}</div>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Current Semester:</label>
                            <div style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '500' }}>{formData.currentEducation.currentSemester}th</div>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Institutional Roll No.:</label>
                            <div style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '500' }}>{formData.currentEducation.rollNo}</div>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Branch/Specialization:</label>
                            <div style={{ fontSize: '0.95rem', color: '#1e293b', fontWeight: '500' }}>{formData.currentEducation.specialization || formData.currentEducation.department}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Semester wise Scores Table */}
            <div className="card-ui semester-scores-card" style={{ marginBottom: '20px', padding: '24px' }}>
                <h4 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '20px', fontWeight: '600' }}>Semester wise Scores</h4>

                <div style={{ overflowX: 'auto' }}>
                    <table className="transposed-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #f1f5f9' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc' }}>
                                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.85rem' }}>Semester</th>
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <th key={num} style={{ padding: '12px', textAlign: 'center', border: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.85rem' }}>{num}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid #f1f5f9', fontSize: '0.85rem', color: '#64748b' }}>Cgpa</td>
                                {formData.currentEducation.semesterScores.map((score, idx) => (
                                    <td key={idx} style={{ padding: '12px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                                        <input type="text" value={score.cgpa} onChange={(e) => handleScoreChange(idx, 'cgpa', e.target.value)} style={{ width: '100%', border: 'none', textAlign: 'center', color: '#1e293b', fontWeight: '500' }} />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid #f1f5f9', fontSize: '0.85rem', color: '#64748b' }}>Sgpa</td>
                                {formData.currentEducation.semesterScores.map((score, idx) => (
                                    <td key={idx} style={{ padding: '12px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                                        <input type="text" value={score.sgpa} onChange={(e) => handleScoreChange(idx, 'sgpa', e.target.value)} style={{ width: '100%', border: 'none', textAlign: 'center', color: '#1e293b', fontWeight: '500' }} />
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid #f1f5f9', fontSize: '0.85rem', color: '#64748b' }}>Ongoing Backlogs</td>
                                {formData.currentEducation.semesterScores.map((score, idx) => (
                                    <td key={idx} style={{ padding: '12px', border: '1px solid #f1f5f9', textAlign: 'center', color: '#64748b' }}>-</td>
                                ))}
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid #f1f5f9', fontSize: '0.85rem', color: '#64748b' }}>Total Backlogs</td>
                                {formData.currentEducation.semesterScores.map((score, idx) => (
                                    <td key={idx} style={{ padding: '12px', border: '1px solid #f1f5f9', textAlign: 'center', color: '#64748b' }}>-</td>
                                ))}
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid #f1f5f9', fontSize: '0.85rem', color: '#64748b' }}>Attached Documents</td>
                                {formData.currentEducation.semesterScores.map((score, idx) => (
                                    <td key={idx} style={{ padding: '12px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                            <div style={{ border: '1px dashed #cbd5e1', borderRadius: '4px', padding: '4px', cursor: 'pointer' }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                                            </div>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Upload</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Marksheet Upload area */}
            <div className="card-ui marksheet-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <span style={{ color: '#ef4444' }}>📄</span>
                    <h4 style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '600', margin: 0 }}>Marksheet</h4>
                </div>
                <div style={{
                    border: '2px dashed #e2e8f0',
                    borderRadius: '12px',
                    padding: '40px',
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    cursor: 'pointer'
                }}>
                    <div style={{ marginBottom: '12px' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Drag and drop your marksheet here</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>or click to browse (PDF, max 5MB)</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileEducation;
