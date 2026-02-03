import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config/api';

/**
 * ManageCourses component
 * Admin course management interface
 */
const ManageCourses = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourses();
        fetchTeachers();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/courses`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch courses');

            const data = await response.json();
            setCourses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/teachers`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTeachers(data.teachers);
            }
        } catch (err) {
            console.error('Fetch Teachers Error:', err);
        }
    };

    const assignteacher = async (courseId, teacherId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/courses/${courseId}/assign-teacher`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify({ teacherId })
            });

            if (!response.ok) throw new Error('Failed to assign teacher');

            alert('teacher assigned successfully!');
            fetchCourses();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    if (loading) return <div className="loading">Loading courses...</div>;

    return (
        <div className="manage-courses">
            <div className="page-header">
                <div>
                    <h1>Manage Courses</h1>
                    <p>View and manage all courses in the system</p>
                </div>
                <div>
                    <a href="./CreateCourse" className="btn-primary">
                        ➕ Create New Course
                    </a>
                </div>
            </div>

            {error && (
                <div className="alert alert-error">
                    <span>⚠️</span> {error}
                </div>
            )}

            {courses.length > 0 ? (
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course._id} className="course-card">
                            <div className="course-header">
                                <h3>{course.title}</h3>
                                <span className="course-code">{course.code || 'N/A'}</span>
                            </div>

                            <div className="course-details">
                                <p><strong>Description:</strong> {course.description}</p>
                                <p><strong>Duration:</strong> {course.duration || 'N/A'}</p>
                                <p><strong>teacher:</strong> {course.teacher?.firstName || 'Not Assigned'} {course.teacher?.lastName || ''}</p>
                                <p><strong>Enrolled Students:</strong> {course.enrolledStudents?.length || 0}</p>
                            </div>

                            <div className="course-actions">
                                <select
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            assignteacher(course._id, e.target.value);
                                        }
                                    }}
                                    className="teacher-select"
                                    defaultValue=""
                                >
                                    <option value="">Assign teacher</option>
                                    {teachers.map(teacher => (
                                        <option key={teacher._id} value={teacher._id}>
                                            {teacher.firstName} {teacher.lastName}
                                        </option>
                                    ))}
                                </select>

                                <button className="btn-sm btn-info">
                                    👥 View Students
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-data">
                    <p>No courses available. Create your first course to get started.</p>
                </div>
            )}
        </div>
    );
};

export default ManageCourses;