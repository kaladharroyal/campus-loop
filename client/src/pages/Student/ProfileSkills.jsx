import React from 'react';


const ProfileSkills = ({
    formData,
    newSkill,
    setNewSkill,
    handleAddSkill,
    handleRemoveSkill
}) => {
    return (
        <div className="form-section">
            <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '8px', fontWeight: '700' }}>YOUR SKILLS</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>List all your relevant skills.</p>

            <div className="card-ui skills-card" style={{ padding: '24px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div className="icon-wrapper" style={{ backgroundColor: '#f0f4ff', color: '#6366f1' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                    </div>
                    <h4 style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '600', margin: 0 }}>Add New Skill</h4>
                </div>

                <div className="grid-2">
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Skill Name<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" className="input-outline" value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} style={{ border: '1px solid #e2e8f0' }} />
                    </div>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Proficiency Level<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" className="input-outline" value={newSkill.level} onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })} style={{ border: '1px solid #e2e8f0' }} />
                    </div>
                </div>

                {/* Proficiency Legend */}
                <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="proficiency-level" style={{ background: '#f8fafc', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Beginner
                    </div>
                    <div className="proficiency-level" style={{ background: '#f8fafc', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Intermediate
                    </div>
                    <div className="proficiency-level" style={{ background: '#f8fafc', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span> Advanced
                    </div>
                    <div className="proficiency-level" style={{ background: '#f8fafc', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span> Expert
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button className="btn-primary" onClick={handleAddSkill} style={{ background: '#6366f1', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '500' }}>Add Skill</button>
            </div>

            <div className="skills-list" style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {formData.skills.map((skill, index) => (
                    <div key={index} className="skill-tag" style={{
                        background: '#fff',
                        border: '1px solid #e2e8f0',
                        padding: '8px 16px',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.9rem',
                        color: '#1e293b',
                        fontWeight: '500'
                    }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: skill.level === 'Beginner' ? '#10b981' : skill.level === 'Intermediate' ? '#f59e0b' : skill.level === 'Advanced' ? '#3b82f6' : '#ef4444'
                        }}></span>
                        <span>{skill.name}</span>
                        <span onClick={() => handleRemoveSkill(index)} style={{ cursor: 'pointer', color: '#94a3b8', fontSize: '1.2rem', marginLeft: '4px' }}>×</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileSkills;
