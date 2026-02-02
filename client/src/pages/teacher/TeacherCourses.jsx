import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/teacher.css';

const TeacherCourses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all'); // all, published, draft
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModal, setDeleteModal] = useState(null);

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
                setCourses(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to load courses');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (courseId) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            const response = await fetch(`http://localhost:5000/api/teacher/course/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setCourses(courses.filter(c => c._id !== courseId));
                setDeleteModal(null);
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to delete course');
            console.error(err);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesFilter = filter === 'all' || course.status === filter;
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return <div className="page-container"><p>Loading courses...</p></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>My Courses</h1>
                <button className="btn btn-primary" onClick={() => navigate('/teacher/course/create')}>
                    + Create New Course
                </button>
            </div>

            <div className="filters-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All ({courses.length})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'published' ? 'active' : ''}`}
                        onClick={() => setFilter('published')}
                    >
                        Published ({courses.filter(c => c.status === 'published').length})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
                        onClick={() => setFilter('draft')}
                    >
                        Drafts ({courses.filter(c => c.status === 'draft').length})
                    </button>
                </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            {filteredCourses.length === 0 ? (
                <div className="empty-state">
                    <p>No courses found.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/teacher/course/create')}>
                        Create Your First Course
                    </button>
                </div>
            ) : (
                <div className="courses-grid">
                    {filteredCourses.map(course => (
                        <div key={course._id} className="course-card">
                            <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                            <div className="course-content">
                                <div className="course-header">
                                    <h3>{course.title}</h3>
                                    <span className={`status-badge ${course.status}`}>
                                        {course.status}
                                    </span>
                                </div>
                                <p className="course-description">{course.description.substring(0, 100)}...</p>
                                <div className="course-meta">
                                    <span>📚 {course.category}</span>
                                    <span>📊 {course.level}</span>
                                    <span>⏱️ {course.duration}</span>
                                </div>
                                <div className="course-stats">
                                    <span>👥 {course.enrolledCount} Students</span>
                                    <span>✅ {course.completedCount} Completed</span>
                                </div>
                                <div className="course-actions">
                                    <button
                                        className="btn-small btn-secondary"
                                        onClick={() => navigate(`/teacher/course/${course._id}/students`)}
                                    >
                                        View Students
                                    </button>
                                    <button
                                        className="btn-small btn-secondary"
                                        onClick={() => navigate(`/teacher/course/edit/${course._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-small btn-danger"
                                        onClick={() => setDeleteModal(course)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div className="modal-overlay" onClick={() => setDeleteModal(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Delete Course</h2>
                        <p>Are you sure you want to delete "{deleteModal.title}"?</p>
                        <p className="warning-text">This action cannot be undone. All associated assignments and submissions will be deleted.</p>
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setDeleteModal(null)}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(deleteModal._id)}
                            >
                                Delete Course
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherCourses;
