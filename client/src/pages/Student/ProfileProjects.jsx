import React from 'react';

const ProfileProjects = ({
    formData,
    newProject,
    setNewProject,
    handleAddProject,
    handleRemoveProject
}) => {
    return (
        <div className="form-section">
            {formData.projects.length === 0 && (
                <div className="empty-state">
                    <span className="empty-state-icon">📂</span>
                    <h4>No projects added yet</h4>
                    <p>Add your projects to showcase your practical experience and technical skills</p>
                </div>
            )}

            <div className="custom-checkbox-container">
                <input type="checkbox" id="no-projects" />
                <label htmlFor="no-projects">I've not done any projects</label>
            </div>

            <div className="card-ui" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
                    <div className="icon-wrapper" style={{ backgroundColor: '#f0f4ff', color: '#6366f1', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                    </div>
                    <h4 style={{ fontSize: '1rem', color: '#1e293b', fontWeight: '700', margin: 0 }}>Add New Project</h4>
                </div>

                <div className="grid-1" style={{ gap: '24px' }}>
                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Project name<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" className="input-outline" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} placeholder="Project name" style={{ border: '1px solid #e2e8f0' }} />
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Project domain<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" value={newProject.domain} onChange={(e) => setNewProject({ ...newProject, domain: e.target.value })} style={{ border: '1px solid #e2e8f0' }}>
                            <option value="">Search or Add..</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="Machine Learning">Machine Learning</option>
                        </select>
                    </div>

                    <div className="grid-2">
                        <div className="input-group">
                            <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Start date<span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="date" className="input-outline" value={newProject.startDate} onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} style={{ border: '1px solid #e2e8f0' }} />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>End date<span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="date" className="input-outline" value={newProject.endDate} onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} style={{ border: '1px solid #e2e8f0' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>I'm currently working on this project</span>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Select skills used in the project<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" style={{ border: '1px solid #e2e8f0' }}>
                            <option value="">Search or Add..</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Description<span style={{ color: '#ef4444' }}>*</span></label>
                        <textarea className="input-outline" rows="4" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} style={{ border: '1px solid #e2e8f0', resize: 'none' }} />
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Project Link</label>
                        <input type="url" className="input-outline" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} placeholder="Project Link" style={{ border: '1px solid #e2e8f0' }} />
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Level of Completion</label>
                        <div className="range-slider-container">
                            <input
                                type="range"
                                className="range-slider"
                                min="0" max="100"
                                step="20"
                                value={newProject.completionLevel}
                                onChange={(e) => setNewProject({ ...newProject, completionLevel: e.target.value })}
                            />
                            <div className="range-labels">
                                <span>0%</span>
                                <span>20%</span>
                                <span>40%</span>
                                <span>60%</span>
                                <span>80%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-primary" onClick={handleAddProject} style={{ background: '#6366f1', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '500' }}>Add Project</button>
                    </div>
                </div>
            </div>

            <div className="items-list" style={{ marginTop: '30px' }}>
                {formData.projects.map((project, index) => (
                    <div key={index} className="card-ui" style={{ padding: '20px', marginBottom: '16px', position: 'relative', border: '1px solid #e2e8f0' }}>
                        <button onClick={() => handleRemoveProject(index)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div className="icon-wrapper" style={{ backgroundColor: '#f8fafc', color: '#6366f1', width: '40px', height: '40px' }}>🚀</div>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#1e293b' }}>{project.name}</h4>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#6366f1', fontSize: '0.9rem' }}>{project.domain}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Status: {project.completionLevel}% Complete</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileProjects;
