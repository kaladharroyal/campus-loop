import React, { useState, useEffect } from 'react';
import '../../styles/admin.css';

/**
 * ManageCourses Component
 * Course management page for administrators
 */
const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses');
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading courses...</div>;
    }

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manage Courses</h1>
                <button className="admin-btn admin-btn-primary">
                    ➕ Create Course
                </button>
            </div>

            <div className="admin-count">
                Total Courses: <strong>{courses.length}</strong>
            </div>

            <div className="admin-cards-grid">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course._id} className="admin-course-card">
                            <div className="course-thumbnail">
                                <img src={course.thumbnail} alt={course.title} />
                            </div>
                            <div className="course-info">
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <div className="course-meta">
                                    <span>📚 {course.category}</span>
                                    <span>⏱️ {course.duration}</span>
                                    <span>📊 {course.level}</span>
                                </div>
                                <div className="course-stats">
                                    <span>👥 {course.studentsEnrolled?.length || 0} students</span>
                                </div>
                                <div className="admin-actions">
                                    <button className="admin-btn admin-btn-sm admin-btn-info">
                                        ✏️ Edit
                                    </button>
                                    <button className="admin-btn admin-btn-sm admin-btn-danger">
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No courses available</p>
                        <button className="admin-btn admin-btn-primary">
                            Create First Course
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageCourses;
