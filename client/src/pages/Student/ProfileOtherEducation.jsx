import React from 'react';

const ProfileOtherEducation = ({ formData, handlePreviousEducationChange }) => {
    return (
        <div className="form-section">
            <h3 style={{ fontSize: '1.2rem', color: '#1e293b', fontWeight: '700', marginBottom: '8px' }}>Previous Educations</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>List all your educational qualifications and academic achievements.</p>

            {/* Class XII Card */}
            <div className="card-ui xii-form-card" style={{ padding: '24px', marginBottom: '30px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '1.2rem', color: '#f59e0b' }}>🔓</span>
                        <h4 style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '700', margin: 0 }}>CLASS XII/Intermediate/Diploma</h4>
                    </div>
                    <span style={{ background: '#fffbeb', color: '#f59e0b', fontSize: '0.7rem', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', border: '1px solid #fef3c7' }}>Pre-selected</span>
                </div>

                <div className="grid-2">
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>School/Institution Name<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" value={formData.previousEducation.classXII.schoolName} onChange={(e) => handlePreviousEducationChange('classXII', 'schoolName', e.target.value)} style={{ border: '1px solid #e2e8f0' }}>
                            <option value="">Search or add school..</option>
                            <option value="KV No. 1">KV No. 1</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Select Program/Degree/Certificate<span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#f59e0b' }}>🔓</span>
                            <select className="input-outline" value={formData.previousEducation.classXII.program} onChange={(e) => handlePreviousEducationChange('classXII', 'program', e.target.value)} style={{ border: '1px solid #cbd5e1', paddingLeft: '36px', background: '#f8fafc' }}>
                                <option value="Class XII">Class XII</option>
                                <option value="Diploma">Diploma</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Select Board/University<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" value={formData.previousEducation.classXII.board} onChange={(e) => handlePreviousEducationChange('classXII', 'board', e.target.value)} style={{ border: '1px solid #e2e8f0' }}>
                            <option value="">Search or add board...</option>
                            <option value="CBSE">CBSE</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Select Start Year & End Year<span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <select className="input-outline" value={formData.previousEducation.classXII.startYear} onChange={(e) => handlePreviousEducationChange('classXII', 'startYear', e.target.value)} style={{ border: '1px solid #e2e8f0' }}>
                                <option value="2024">2024</option>
                            </select>
                            <select className="input-outline" value={formData.previousEducation.classXII.endYear} onChange={(e) => handlePreviousEducationChange('classXII', 'endYear', e.target.value)} style={{ border: '1px solid #e2e8f0' }}>
                                <option value="2026">2026</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Select Education Type<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" style={{ border: '1px solid #e2e8f0' }}>
                            <option value="Full Time">Full Time</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Score in Percentage<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" className="input-outline" value={formData.previousEducation.classXII.percentage} onChange={(e) => handlePreviousEducationChange('classXII', 'percentage', e.target.value)} placeholder="Enter percentage" style={{ border: '1px solid #e2e8f0' }} />
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Your CGPA</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '12px' }}>
                            <input type="text" className="input-outline" value={formData.previousEducation.classXII.cgpa} onChange={(e) => handlePreviousEducationChange('classXII', 'cgpa', e.target.value)} placeholder="Your CGPA" style={{ border: '1px solid #e2e8f0' }} />
                            <select className="input-outline" style={{ border: '1px solid #e2e8f0' }}><option>CGPA</option></select>
                        </div>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Total CGPA</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '12px' }}>
                            <input type="text" className="input-outline" value={formData.previousEducation.classXII.totalCgpa} onChange={(e) => handlePreviousEducationChange('classXII', 'totalCgpa', e.target.value)} placeholder="Total CGPA" style={{ border: '1px solid #e2e8f0' }} />
                            <select className="input-outline" style={{ border: '1px solid #e2e8f0' }}><option>CGPA</option></select>
                        </div>
                    </div>
                </div>
                <div className="input-group" style={{ marginTop: '20px' }}>
                    <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Notes/Highlights</label>
                    <textarea
                        className="input-outline"
                        rows="3"
                        value={formData.previousEducation.classXII.notes}
                        onChange={(e) => handlePreviousEducationChange('classXII', 'notes', e.target.value)}
                        placeholder="You can mention your class/department/university ranks or other highlights, if any"
                        style={{ border: '1px solid #e2e8f0', resize: 'none', height: '100px' }}
                    ></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <button className="btn-primary" style={{ background: '#6366f1', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.1rem' }}>💾</span> Save CLASS XII/Intermediate/Diploma
                    </button>
                </div>
            </div>

            {/* Class X Card */}
            <div className="card-ui x-form-card" style={{ padding: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '1.2rem', color: '#f59e0b' }}>🔓</span>
                        <h4 style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '700', margin: 0 }}>CLASS X</h4>
                    </div>
                    <span style={{ background: '#fffbeb', color: '#f59e0b', fontSize: '0.7rem', fontWeight: '600', padding: '4px 12px', borderRadius: '20px', border: '1px solid #fef3c7' }}>Pre-selected</span>
                </div>

                <div className="grid-2">
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>School/Institution Name<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" value={formData.previousEducation.classX.schoolName} onChange={(e) => handlePreviousEducationChange('classX', 'schoolName', e.target.value)} style={{ border: '1px solid #e2e8f0' }}>
                            <option value="">Search or add school..</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Select Program/Degree/Certificate<span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#f59e0b' }}>🔓</span>
                            <select className="input-outline" value={formData.previousEducation.classX.program} onChange={(e) => handlePreviousEducationChange('classX', 'program', e.target.value)} style={{ border: '1px solid #cbd5e1', paddingLeft: '36px', background: '#f8fafc' }}>
                                <option value="Class X">Class X</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Select Board/University<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" value={formData.previousEducation.classX.board} onChange={(e) => handlePreviousEducationChange('classX', 'board', e.target.value)} style={{ border: '1px solid #e2e8f0' }}>
                            <option value="">Search or add board...</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Select Start Year & End Year<span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <select className="input-outline" value={formData.previousEducation.classX.startYear} onChange={(e) => handlePreviousEducationChange('classX', 'startYear', e.target.value)} style={{ border: '1px solid #e2e8f0' }}>
                                <option value="2024">2024</option>
                            </select>
                            <select className="input-outline" value={formData.previousEducation.classX.endYear} onChange={(e) => handlePreviousEducationChange('classX', 'endYear', e.target.value)} style={{ border: '1px solid #e2e8f0' }}>
                                <option value="2026">2026</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Select Education Type<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" style={{ border: '1px solid #e2e8f0' }}>
                            <option value="Full Time">Full Time</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Score in Percentage<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" className="input-outline" value={formData.previousEducation.classX.percentage} onChange={(e) => handlePreviousEducationChange('classX', 'percentage', e.target.value)} placeholder="Enter percentage" style={{ border: '1px solid #e2e8f0' }} />
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Your CGPA</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '12px' }}>
                            <input type="text" className="input-outline" value={formData.previousEducation.classX.cgpa} onChange={(e) => handlePreviousEducationChange('classX', 'cgpa', e.target.value)} placeholder="Your CGPA" style={{ border: '1px solid #e2e8f0' }} />
                            <select className="input-outline" style={{ border: '1px solid #e2e8f0' }}><option>CGPA</option></select>
                        </div>
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Total CGPA</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '12px' }}>
                            <input type="text" className="input-outline" value={formData.previousEducation.classX.totalCgpa} onChange={(e) => handlePreviousEducationChange('classX', 'totalCgpa', e.target.value)} placeholder="Total CGPA" style={{ border: '1px solid #e2e8f0' }} />
                            <select className="input-outline" style={{ border: '1px solid #e2e8f0' }}><option>CGPA</option></select>
                        </div>
                    </div>
                </div>
                <div className="input-group" style={{ marginTop: '20px' }}>
                    <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Notes/Highlights</label>
                    <textarea
                        className="input-outline"
                        rows="3"
                        value={formData.previousEducation.classX.notes}
                        onChange={(e) => handlePreviousEducationChange('classX', 'notes', e.target.value)}
                        placeholder="You can mention your class/department/university ranks or other highlights, if any"
                        style={{ border: '1px solid #e2e8f0', resize: 'none', height: '100px' }}
                    ></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <button className="btn-primary" style={{ background: '#6366f1', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.1rem' }}>💾</span> Save CLASS X
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileOtherEducation;
