import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/pages.css';

const CourseOverview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth(); // Get user from context
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        if (user && course) {
            // Check if user is in the studentsEnrolled array of the course
            const isUserEnrolled = course.studentsEnrolled && course.studentsEnrolled.some(student =>
                (typeof student === 'object' ? student._id === user._id : student === user._id)
            );
            setIsEnrolled(!!isUserEnrolled);
        }
    }, [user, course]);

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${id}`);

            // Check response status first
            if (!response.ok) {
                if (response.status === 404) {
                    setError('This course does not exist or has been removed.');
                } else {
                    setError(`Error loading course (Status: ${response.status})`);
                }
                setLoading(false);
                return;
            }

            // Check content-type before parsing JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                setError('Invalid response from server.');
                setLoading(false);
                return;
            }

            const data = await response.json();

            if (data.success) {
                setCourse(data.data);
            } else {
                setError(data.message || 'Course not found');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to load course details');
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (isEnrolled) {
            navigate(`/course/${encodeURIComponent(course.title)}/play`);
            return;
        }

        try {
            const token = user.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
            const response = await fetch(`http://localhost:5000/api/courses/${id}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setIsEnrolled(true);
                // Refresh course data to update enrollment count
                fetchCourseDetails();
                alert("Successfully enrolled! You can now start learning.");
            } else {
                alert(data.message || 'Enrollment failed');
            }
        } catch (error) {
            console.error("Enrollment error:", error);
            alert('Something went wrong. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="page-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <p>Loading course details...</p>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="page-container" style={{
                textAlign: 'center',
                padding: '60px 20px',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                <div style={{
                    fontSize: '60px',
                    marginBottom: '20px',
                    opacity: 0.5
                }}>📚</div>
                <h2 style={{
                    color: '#2c3e50',
                    marginBottom: '15px'
                }}>Course Not Found</h2>
                <p style={{
                    color: '#64748b',
                    marginBottom: '30px',
                    lineHeight: '1.6'
                }}>
                    {error || 'This course does not exist or has been removed.'}
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/courses')}
                    >
                        Browse All Courses
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/dashboard')}
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <button className="btn btn-secondary" onClick={() => navigate('/courses')} style={{ marginBottom: '20px' }}>
                ← Back to Courses
            </button>

            <div className="course-overview-container">
                {/* Hero Section */}
                <div className="course-hero">
                    <div className="course-hero-content">
                        <div className="course-badges">
                            <span className="badge">{course.category}</span>
                            <span className="badge">{course.level}</span>
                        </div>
                        <h1>{course.title}</h1>
                        <p className="course-description">{course.description}</p>

                        <div className="course-meta-info">
                            <span>👨‍🏫 {course.teacher?.firstName} {course.teacher?.lastName}</span>
                            <span>⏱️ {course.duration}</span>
                            <span>👥 {course.studentsEnrolled?.length || 0} students</span>
                        </div>

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleEnroll}
                            style={{ marginTop: '20px', padding: '14px 32px', fontSize: '16px' }}
                        >
                            {isEnrolled ? 'Start Course' : 'Enroll Now'}
                        </button>
                    </div>

                    {course.thumbnail && (
                        <div className="course-hero-image">
                            <img src={course.thumbnail} alt={course.title} />
                        </div>
                    )}
                </div>

                {/* Course Content */}
                <div className="course-details-grid">
                    {/* What You'll Learn */}
                    <div className="course-section">
                        <h2>What You'll Learn</h2>
                        <ul className="learning-outcomes">
                            <li>Master the fundamentals of {course.title}</li>
                            <li>Build real-world projects</li>
                            <li>Gain practical skills for {course.category}</li>
                            <li>Get certified upon completion</li>
                        </ul>
                    </div>

                    {/* Course Curriculum */}
                    {course.curriculum && course.curriculum.length > 0 && (
                        <div className="course-section">
                            <h2>Course Curriculum</h2>
                            <div className="curriculum-list">
                                {course.curriculum.map((module, index) => (
                                    <div key={index} className="curriculum-module">
                                        <h3>{module.title}</h3>
                                        {module.topics && module.topics.length > 0 && (
                                            <ul>
                                                {module.topics.map((topic, topicIndex) => (
                                                    <li key={topicIndex}>{topic}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Instructor Info */}
                    {course.teacher && (
                        <div className="course-section">
                            <h2>Your Instructor</h2>
                            <div className="instructor-card">
                                <div className="instructor-avatar">
                                    {course.teacher.firstName?.[0]}{course.teacher.lastName?.[0]}
                                </div>
                                <div>
                                    <h3>{course.teacher.firstName} {course.teacher.lastName}</h3>
                                    <p>{course.teacher.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .course-overview-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .course-hero {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 40px;
                    margin-bottom: 50px;
                    padding: 40px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 16px;
                    color: white;
                }

                .course-badges {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .badge {
                    background: rgba(255, 255, 255, 0.2);
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 13px;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .course-hero h1 {
                    font-size: 2.5rem;
                    margin: 0 0 15px 0;
                    line-height: 1.2;
                }

                .course-description {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    opacity: 0.95;
                    margin-bottom: 20px;
                }

                .course-meta-info {
                    display: flex;
                    gap: 25px;
                    flex-wrap: wrap;
                    font-size: 0.95rem;
                }

                .course-hero-image {
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                }

                .course-hero-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .course-details-grid {
                    display: grid;
                    gap: 30px;
                }

                .course-section {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
                }

                .course-section h2 {
                    margin: 0 0 20px 0;
                    color: #2c3e50;
                    font-size: 1.5rem;
                }

                .learning-outcomes {
                    list-style: none;
                    padding: 0;
                }

                .learning-outcomes li {
                    padding: 12px 0;
                    border-bottom: 1px solid #ecf0f1;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    justify-content: start;
                }

                .learning-outcomes li:before {
                    content: '✓';
                    background: #22c55e;
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    flex-shrink: 0;
                    margin-right: 12px;
                }

                .curriculum-module {
                    margin-bottom: 20px;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 8px;
                }

                .curriculum-module h3 {
                    margin: 0 0 10px 0;
                    color: #34495e;
                    font-size: 1.1rem;
                }

                .curriculum-module ul {
                    margin: 0;
                    padding-left: 25px;
                    color: #64748b;
                }

                .curriculum-module li {
                    padding: 5px 0;
                }

                .instructor-card {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .instructor-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.8rem;
                    font-weight: 700;
                }

                .instructor-card h3 {
                    margin: 0 0 5px 0;
                    color: #2c3e50;
                }

                .instructor-card p {
                    margin: 0;
                    color: #64748b;
                }

                @media (max-width: 768px) {
                    .course-hero {
                        grid-template-columns: 1fr;
                        padding: 25px;
                    }

                    .course-hero h1 {
                        font-size: 1.8rem;
                    }

                    .course-meta-info {
                        flex-direction: column;
                        gap: 10px;
                    }

                    .course-section {
                        padding: 20px;
                    }
                }
            `}</style>
        </div>
    );
};

export default CourseOverview;
