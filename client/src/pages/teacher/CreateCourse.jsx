import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/teacher.css';

const CreateCourse = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        level: 'Beginner',
        duration: '',
        thumbnail: '',
        videoLink: '',
        status: 'draft',
        curriculum: [{ moduleTitle: '', topics: [''], duration: '' }]
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCurriculumChange = (index, field, value) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[index][field] = value;
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const handleTopicChange = (moduleIndex, topicIndex, value) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[moduleIndex].topics[topicIndex] = value;
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const addModule = () => {
        setFormData({
            ...formData,
            curriculum: [...formData.curriculum, { moduleTitle: '', topics: [''], duration: '' }]
        });
    };

    const removeModule = (index) => {
        const newCurriculum = formData.curriculum.filter((_, i) => i !== index);
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const addTopic = (moduleIndex) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[moduleIndex].topics.push('');
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const removeTopic = (moduleIndex, topicIndex) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[moduleIndex].topics.splice(topicIndex, 1);
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;

            if (!token) {
                alert('Please log in again');
                return;
            }

            const response = await fetch('http://localhost:5000/api/teacher/course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                alert('Course created successfully!');
                navigate('/teacher/courses');
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to create course');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Create New Course</h1>
                <button className="btn btn-primary" onClick={() => navigate('/teacher/courses')}>
                    Back to Courses
                </button>
            </div>

            <form onSubmit={handleSubmit} className="course-form">
                <div className="form-section">
                    <h2>Basic Information</h2>
                    <div className="form-group">
                        <label>Course Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Category *</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="e.g., Web Development, Data Science"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Level *</label>
                            <select name="level" value={formData.level} onChange={handleChange} required>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Duration *</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="e.g., 8 weeks"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Thumbnail URL</label>
                            <input
                                type="url"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="form-group">
                            <label>Video Link (Optional)</label>
                            <input
                                type="url"
                                name="videoLink"
                                value={formData.videoLink}
                                onChange={handleChange}
                                placeholder="https://youtube.com/watch?v=..."
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Status *</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        <small>Drafts are only visible to you. Published courses are visible to students.</small>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Course Curriculum</h2>
                    {formData.curriculum.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="module-block">
                            <div className="module-header">
                                <h3>Module {moduleIndex + 1}</h3>
                                {formData.curriculum.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn-small btn-danger"
                                        onClick={() => removeModule(moduleIndex)}
                                    >
                                        Remove Module
                                    </button>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Module Title *</label>
                                <input
                                    type="text"
                                    value={module.moduleTitle}
                                    onChange={(e) => handleCurriculumChange(moduleIndex, 'moduleTitle', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Duration</label>
                                <input
                                    type="text"
                                    value={module.duration}
                                    onChange={(e) => handleCurriculumChange(moduleIndex, 'duration', e.target.value)}
                                    placeholder="e.g., 2 hours"
                                />
                            </div>

                            <div className="form-group">
                                <label>Topics</label>
                                {module.topics.map((topic, topicIndex) => (
                                    <div key={topicIndex} className="topic-row">
                                        <input
                                            type="text"
                                            value={topic}
                                            onChange={(e) => handleTopicChange(moduleIndex, topicIndex, e.target.value)}
                                            placeholder={`Topic ${topicIndex + 1}`}
                                        />
                                        {module.topics.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn-small btn-danger"
                                                onClick={() => removeTopic(moduleIndex, topicIndex)}
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn-small btn-primary"
                                    onClick={() => addTopic(moduleIndex)}
                                >
                                    + Add Topic
                                </button>
                            </div>
                        </div>
                    ))}

                    <button type="button" className="btn btn-primary" onClick={addModule}>
                        + Add Module
                    </button>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-primary" onClick={() => navigate('/teacher/courses')}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Course'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;
