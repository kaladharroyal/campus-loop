import React from 'react';

const ProfileInterests = ({
    formData,
    toggleInterest,
    customInterest,
    setCustomInterest,
    handleAddCustomInterest
}) => {
    const AVAILABLE_INTERESTS = [
        "3D Printing", "Aerospace", "Artificial Intelligence (AI)", "Automobile Engineering",
        "Backend Development", "CAD Design", "Computer Vision", "Content Writing", "Cyber Security",
        "Data Science", "Digital Marketing", "Embedded Systems", "Front End Development",
        "Full Stack Development", "Game Development", "Hardware (IoT)", "Image Processing",
        "Life Skills", "Machine Learning", "Mechatronics", "Mobile App Development", "Other",
        "Robotics", "Software Testing", "UI/UX", "Web Development"
    ];

    return (
        <div className="form-section">
            <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#1e293b', fontWeight: '700', marginBottom: '4px' }}>Interests</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Tell us what you love</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
                {AVAILABLE_INTERESTS.map(interest => {
                    const isSelected = formData.interests.includes(interest);
                    return (
                        <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: isSelected ? '#f1f5f9' : '#fff',
                                color: '#1e293b',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            {interest} <span style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: '400' }}>+</span>
                        </button>
                    );
                })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    className="btn-primary"
                    style={{ background: '#101828', color: '#fff', border: 'none', padding: '10px 48px', borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem' }}
                >
                    Save changes
                </button>
            </div>
        </div>
    );
};

export default ProfileInterests;
