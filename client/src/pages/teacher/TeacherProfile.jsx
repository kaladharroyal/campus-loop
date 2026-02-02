import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/teacher.css';

const TeacherProfile = () => {
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        bio: '',
        profilePicture: '',
        skills: [],
        socialLinks: {
            github: '',
            linkedin: '',
            twitter: ''
        }
    });
    const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                bio: user.bio || '',
                profilePicture: user.profilePicture || '',
                skills: user.skills || [],
                socialLinks: user.socialLinks || { github: '', linkedin: '', twitter: '' }
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSocialChange = (platform, value) => {
        setFormData({
            ...formData,
            socialLinks: {
                ...formData.socialLinks,
                [platform]: value
            }
        });
    };

    const handleAddSkill = () => {
        if (newSkill.name.trim()) {
            setFormData({
                ...formData,
                skills: [...formData.skills, newSkill]
            });
            setNewSkill({ name: '', level: 'Beginner' });
        }
    };

    const handleRemoveSkill = (index) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            const response = await fetch('http://localhost:5000/api/teacher/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                setUser(data.data);
                alert('Profile updated successfully!');
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to update profile');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Teacher Profile</h1>
            </div>

            <form onSubmit={handleSubmit} className="course-form">
                <div className="form-section">
                    <h2>Personal Information</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Profile Picture URL</label>
                        <input
                            type="url"
                            name="profilePicture"
                            value={formData.profilePicture}
                            onChange={handleChange}
                            placeholder="https://example.com/profile.jpg"
                        />
                    </div>

                    <div className="form-group">
                        <label>Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Tell students about yourself, your expertise, and teaching philosophy..."
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Expertise & Skills</h2>
                    <div className="skills-list">
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="skill-tag">
                                <span>{skill.name} - {skill.level}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSkill(index)}
                                    className="remove-btn"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="add-skill-form">
                        <input
                            type="text"
                            placeholder="Skill name"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        />
                        <select
                            value={newSkill.level}
                            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>
                        <button type="button" className="btn-small btn-primary" onClick={handleAddSkill}>
                            Add Skill
                        </button>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Social Links</h2>
                    <div className="form-group">
                        <label>GitHub</label>
                        <input
                            type="url"
                            value={formData.socialLinks.github}
                            onChange={(e) => handleSocialChange('github', e.target.value)}
                            placeholder="https://github.com/username"
                        />
                    </div>
                    <div className="form-group">
                        <label>LinkedIn</label>
                        <input
                            type="url"
                            value={formData.socialLinks.linkedin}
                            onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Twitter</label>
                        <input
                            type="url"
                            value={formData.socialLinks.twitter}
                            onChange={(e) => handleSocialChange('twitter', e.target.value)}
                            placeholder="https://twitter.com/username"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Update Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeacherProfile;
