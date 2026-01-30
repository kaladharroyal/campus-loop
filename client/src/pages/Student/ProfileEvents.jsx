import React from 'react';

const ProfileEvents = ({
    formData,
    newEvent,
    setNewEvent,
    handleAddEvent,
    handleRemoveEvent
}) => {
    return (
        <div className="form-section">
            <h3 style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: '700', marginBottom: '4px', textTransform: 'uppercase' }}>EVENTS</h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '32px' }}>Tell us about the events/workshops you've attended</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <input type="checkbox" id="no-workshops" style={{ width: '16px', height: '16px' }} />
                <label htmlFor="no-workshops" style={{ fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>I've not done any workshops</label>
            </div>

            <div className="card-ui" style={{ padding: 0, border: 'none', background: 'transparent' }}>
                <div className="grid-1" style={{ gap: '20px' }}>
                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', fontWeight: '500' }}>Title<span style={{ color: '#ef4444' }}>*</span></label>
                        <input type="text" className="input-outline" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                    </div>

                    <div className="grid-2" style={{ gap: '20px' }}>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', fontWeight: '500' }}>Conducted on<span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="date" className="input-outline" value={newEvent.conductedOn} onChange={(e) => setNewEvent({ ...newEvent, conductedOn: e.target.value })} style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', fontWeight: '500' }}>Organizer<span style={{ color: '#ef4444' }}>*</span></label>
                            <input type="text" className="input-outline" value={newEvent.organizer} onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })} style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', fontWeight: '500' }}>Skills acquired<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" style={{ border: '1px solid #e2e8f0', padding: '10px 12px', color: '#94a3b8' }}>
                            <option value="">Search or Add...</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', fontWeight: '500' }}>Type<span style={{ color: '#ef4444' }}>*</span></label>
                        <select className="input-outline" value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })} style={{ border: '1px solid #e2e8f0', padding: '10px 12px', color: '#94a3b8' }}>
                            <option value="">Select type</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Seminar">Seminar</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', fontWeight: '500' }}>Mode<span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '4px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal', fontSize: '0.85rem', color: '#1e293b' }}>
                                <input type="radio" name="event-mode" value="Online" style={{ width: '16px', height: '16px' }} /> Online
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal', fontSize: '0.85rem', color: '#1e293b' }}>
                                <input type="radio" name="event-mode" value="Offline" style={{ width: '16px', height: '16px' }} /> Offline
                            </label>
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', fontWeight: '500' }}>Location</label>
                        <input type="text" className="input-outline" style={{ border: '1px solid #e2e8f0', padding: '10px 12px' }} />
                    </div>

                    <div className="input-group">
                        <label style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', fontWeight: '500' }}>Description</label>
                        <textarea className="input-outline" rows="4" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} style={{ border: '1px solid #e2e8f0', padding: '10px 12px', resize: 'none' }} />
                    </div>

                    <div style={{ marginTop: '12px' }}>
                        <button className="btn-primary" onClick={handleAddEvent} style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '4px', fontWeight: '700', fontSize: '0.85rem' }}>Add Workshop</button>
                    </div>
                </div>
            </div>

            <div className="items-list" style={{ marginTop: '30px' }}>
                {formData.events.map((item, index) => (
                    <div key={index} className="card-ui" style={{ padding: '20px', marginBottom: '16px', position: 'relative', border: '1px solid #e2e8f0' }}>
                        <button onClick={() => handleRemoveEvent(index)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div className="icon-wrapper" style={{ backgroundColor: '#f8fafc', color: '#6366f1', width: '40px', height: '40px' }}>📅</div>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#1e293b' }}>{item.title}</h4>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#6366f1', fontSize: '0.9rem' }}>{item.type} by {item.organizer}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{item.conductedOn}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileEvents;
