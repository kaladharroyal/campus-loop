import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/teacher.css';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/teacher/course/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                const course = data.data;
                setFormData({
                    title: course.title,
                    description: course.description,
                    category: course.category,
                    level: course.level,
                    duration: course.duration,
                    thumbnail: course.thumbnail || '',
                    videoLink: course.videoLink || '',
                    status: course.status,
                    curriculum: course.curriculum.length > 0 ? course.curriculum : [{ moduleTitle: '', topics: [''], duration: '' }]
                });
            } else {
                alert(data.message);
                navigate('/teacher/courses');
            }
        } catch (err) {
            alert('Failed to load course');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
        setSaving(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/teacher/course/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                alert('Course updated successfully!');
                navigate('/teacher/courses');
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to update course');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="page-container"><p>Loading course...</p></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Edit Course</h1>
                <button className="btn btn-secondary" onClick={() => navigate('/teacher/courses')}>
                    Back to Courses
                </button>
            </div>

            <form onSubmit={handleSubmit} className="course-form">
                <div className="form-section">
                    <h2>Basic Information</h2>
                    <div className="form-group">
                        <label>Course Title *</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Category *</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} required />
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
                            <input type="text" name="duration" value={formData.duration} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Thumbnail URL</label>
                            <input type="url" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Video Link</label>
                            <input type="url" name="videoLink" value={formData.videoLink} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Status *</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Course Curriculum</h2>
                    {formData.curriculum.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="module-block">
                            <div className="module-header">
                                <h3>Module {moduleIndex + 1}</h3>
                                {formData.curriculum.length > 1 && (
                                    <button type="button" className="btn-small btn-danger" onClick={() => removeModule(moduleIndex)}>
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
                                            <button type="button" className="btn-small btn-danger" onClick={() => removeTopic(moduleIndex, topicIndex)}>
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" className="btn-small btn-secondary" onClick={() => addTopic(moduleIndex)}>
                                    + Add Topic
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={addModule}>
                        + Add Module
                    </button>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/teacher/courses')}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? 'Saving...' : 'Update Course'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCourse;
