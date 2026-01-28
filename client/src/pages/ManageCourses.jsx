import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/variables.css';
import '../styles/pages.css';

const ManageCourses = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Development',
        duration: '',
        level: 'Beginner',
        thumbnail: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create course');
            }

            setMessage('Course created successfully!');
            setTimeout(() => navigate('/courses'), 1500);
        } catch (error) {
            setMessage('Error creating course. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="manage-container">
            <h1>Create New Course</h1>

            <div className="form-card">
                {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Course Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. MERN Stack Bootcamp" />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" placeholder="Course details..." />
                    </div>

                    <div className="row">
                        <div className="form-group half">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="Development">Development</option>
                                <option value="Design">Design</option>
                                <option value="Business">Business</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Data Science">Data Science</option>
                            </select>
                        </div>

                        <div className="form-group half">
                            <label>Level</label>
                            <select name="level" value={formData.level} onChange={handleChange}>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group half">
                            <label>Duration</label>
                            <input name="duration" value={formData.duration} onChange={handleChange} required placeholder="e.g. 10 Weeks" />
                        </div>
                        <div className="form-group half">
                            <label>Thumbnail URL</label>
                            <input name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="https://..." />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Course'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManageCourses;
