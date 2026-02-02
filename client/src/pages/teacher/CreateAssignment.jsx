import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/teacher.css';

const CreateAssignment = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        course: '',
        dueDate: '',
        maxGrade: 100
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            const response = await fetch('http://localhost:5000/api/teacher/courses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setCourses(data.data.filter(c => c.status === 'published'));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/teacher/assignment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                alert('Assignment created successfully!');
                navigate('/teacher/assignments');
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to create assignment');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Create Assignment</h1>
                <button className="btn btn-primary" onClick={() => navigate('/teacher/assignments')}>
                    Back to Assignments
                </button>
            </div>

            <form onSubmit={handleSubmit} className="course-form">
                <div className="form-section">
                    <div className="form-group">
                        <label>Assignment Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., React Final Project"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Provide detailed instructions for the assignment..."
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Select Course *</label>
                            <select name="course" value={formData.course} onChange={handleChange} required>
                                <option value="">-- Select Course --</option>
                                {courses.map(course => (
                                    <option key={course._id} value={course._id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                            {courses.length === 0 && (
                                <small className="error-message">No published courses found. Create and publish a course first.</small>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Due Date *</label>
                            <input
                                type="datetime-local"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Maximum Grade *</label>
                            <input
                                type="number"
                                name="maxGrade"
                                value={formData.maxGrade}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-primary" onClick={() => navigate('/teacher/assignments')}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading || courses.length === 0}>
                        {loading ? 'Creating...' : 'Create Assignment'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAssignment;
