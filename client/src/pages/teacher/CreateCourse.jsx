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
        curriculum: [{ moduleTitle: '', topics: [{ title: '', time: 0 }], duration: '' }]
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
        newCurriculum[moduleIndex].topics.push({ title: '', time: 0 });
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
                            <select name="level" value={formData.level} onChange={handleChange} className='form-control' required>
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

                    {/* Timestamp Import Section */}
                    <div style={{ background: '#eef2ff', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #c7d2fe' }}>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#4338ca' }}>✨ Auto-Generate from Timestamps</h3>
                        <p style={{ fontSize: '13px', marginBottom: '10px', color: '#6366f1' }}>
                            Paste your YouTube video description (with timestamps like "0:00 Intro") below to automatically generate modules.
                        </p>
                        <textarea
                            placeholder={"Example:\n0:00 Introduction\n2:30 Setting up Environment\n...And so on"}
                            rows="4"
                            id="timestampInput"
                            style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                        ></textarea>
                        <button
                            type="button"
                            className="btn-small btn-primary"
                            onClick={() => {
                                const text = document.getElementById('timestampInput').value;
                                const lines = text.split('\n');
                                const newTopics = [];

                                lines.forEach(line => {
                                    if (!line.trim()) return;

                                    // Flexible regex to match: 0:00 Intro, (0:00) Intro, [0:00] Intro, 0:00 - Intro
                                    const match = line.match(/^\s*[\[\(]?(\d{1,2}:\d{2}(?::\d{2})?)[\]\)]?\s*(?:[-–:.]\s*)?(.*?)\s*$/);

                                    if (match) {
                                        const timeStr = match[1];
                                        let title = match[2];

                                        // Cleanup title
                                        title = title.replace(/^[-–:.]\s*/, ""); // Remove separators
                                        title = title.replace(/^\d+\.?\s*/, ""); // Remove leading numbering (e.g. "1. ")
                                        if (!title) title = "Untitled Topic";

                                        // Convert time to seconds
                                        const parts = timeStr.split(':').reverse();
                                        let seconds = 0;
                                        if (parts[0]) seconds += parseInt(parts[0]);
                                        if (parts[1]) seconds += parseInt(parts[1]) * 60;
                                        if (parts[2]) seconds += parseInt(parts[2]) * 3600;

                                        newTopics.push({ title: title.trim(), time: seconds });
                                    }
                                });

                                if (newTopics.length > 0) {
                                    setFormData({
                                        ...formData,
                                        curriculum: [{
                                            moduleTitle: 'Full Course Content',
                                            topics: newTopics,
                                            duration: `${newTopics.length} sections`
                                        }]
                                    });
                                    alert(`Success! Generated ${newTopics.length} topics.`);
                                } else {
                                    console.log("Failed to parse lines:", lines);
                                    alert("No timestamps found.\n\nTry format:\n0:00 Introduction\n1:05 Next Topic");
                                }
                            }}
                        >
                            Generate Modules
                        </button>
                    </div>

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
                                    <div key={topicIndex} className="topic-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                        <div style={{ flex: 1 }}>
                                            <input
                                                type="text"
                                                value={typeof topic === 'object' ? topic.title : topic}
                                                onChange={(e) => {
                                                    const newCurriculum = [...formData.curriculum];
                                                    if (typeof newCurriculum[moduleIndex].topics[topicIndex] === 'object') {
                                                        newCurriculum[moduleIndex].topics[topicIndex].title = e.target.value;
                                                    } else {
                                                        newCurriculum[moduleIndex].topics[topicIndex] = e.target.value;
                                                    }
                                                    setFormData({ ...formData, curriculum: newCurriculum });
                                                }}
                                                placeholder={`Topic ${topicIndex + 1}`}
                                            />
                                        </div>
                                        <div style={{ width: '100px' }}>
                                            <input
                                                type="number"
                                                value={typeof topic === 'object' ? topic.time : 0}
                                                onChange={(e) => {
                                                    const newCurriculum = [...formData.curriculum];
                                                    // Ensure it's an object structure
                                                    if (typeof newCurriculum[moduleIndex].topics[topicIndex] !== 'object') {
                                                        newCurriculum[moduleIndex].topics[topicIndex] = { title: newCurriculum[moduleIndex].topics[topicIndex], time: 0 };
                                                    }
                                                    newCurriculum[moduleIndex].topics[topicIndex].time = parseInt(e.target.value);
                                                    setFormData({ ...formData, curriculum: newCurriculum });
                                                }}
                                                placeholder="Sec"
                                                title="Start time in seconds"
                                            />
                                        </div>

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
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/teacher/courses')}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !formData.title || !formData.description || !formData.category || !formData.duration}
                    >
                        {loading ? 'Creating...' : 'Create Course'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;
