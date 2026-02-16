import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import API_BASE_URL from '../config/api';

const Home = () => {
    const navigate = useNavigate();
    const [userProgress, setUserProgress] = useState({});
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fallback images array (same as Courses.jsx for consistency)
    const fallbackImages = [
        'https://via.placeholder.com/300x200?text=Course+1',
        'https://via.placeholder.com/300x200?text=Course+2',
        'https://via.placeholder.com/300x200?text=Course+3',
    ];

    const [favorites, setFavorites] = React.useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const token = userInfo?.token;

                // Fetch Registered/Enrolled Courses
                if (token) {
                    const enrolledRes = await fetch(`${API_BASE_URL}/api/courses/mycourses`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const enrolledData = await enrolledRes.json();
                    if (Array.isArray(enrolledData)) {
                        setRegisteredCourses(enrolledData);
                    }

                    // Fetch User Progress
                    const progressRes = await fetch(`${API_BASE_URL}/api/courses/my-progress`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const progressData = await progressRes.json();
                    if (progressData.success) {
                        const progressMap = {};
                        progressData.data.forEach(p => {
                            // Ensure we use the string version of the course ID
                            const courseId = typeof p.course === 'object' ? p.course._id : p.course;
                            progressMap[courseId] = p;
                        });
                        setUserProgress(progressMap);
                    }
                }

                // Fetch All Courses
                const allRes = await fetch(`${API_BASE_URL}/api/courses`);
                const allData = await allRes.json();
                if (allData.success) {
                    setAllCourses(allData.data);
                }

            } catch (error) {
                console.error("Error loading courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleFavorite = (course) => {
        setFavorites(prev => {
            const exists = prev.find(c => c._id === course._id);
            let newFavs;
            if (exists) {
                newFavs = prev.filter(c => c._id !== course._id);
            } else {
                newFavs = [...prev, course];
            }
            localStorage.setItem('favorites', JSON.stringify(newFavs));
            return newFavs;
        });
    };

    const isFav = (id) => favorites.some(c => c._id === id);

    const handleCourseClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    const CourseCard = ({ course, isSmall = false, isRegistered = false }) => {
        // Calculate progress
        const progressInfo = userProgress[course._id];
        let progressPercent = 0;
        if (progressInfo) {
            if (progressInfo.isCompleted) progressPercent = 100;
            else if (progressInfo.completedLessons) {
                let totalLessons = 0;
                if (course.curriculum) {
                    course.curriculum.forEach(m => {
                        if (m.topics) totalLessons += m.topics.length;
                    });
                }
                if (totalLessons === 0) totalLessons = 1; // Avoid divide by zero
                progressPercent = Math.round((progressInfo.completedLessons.length / totalLessons) * 100);
            }
        }

        return (
            <div
                className={`campus-card ${!isSmall ? 'registered' : ''}`}
                onClick={() => handleCourseClick(course._id)}
            >
                <div>
                    {/* Simplified image handling for brevity in this replace block, can adjust if needed */}
                    <div
                        className={`card-image-placeholder ${isSmall ? 'small' : ''}`}
                        style={{ '--accent': '#6366f1' }}
                    >
                        {course.thumbnail ? (
                            <img src={course.thumbnail} alt={course.title} onError={(e) => { e.target.style.display = 'none' }} />
                        ) : (
                            <div style={{ width: '100%', height: '100%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                📚
                            </div>
                        )}

                        <button
                            className={`fav-btn ${isFav(course._id) ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(course);
                            }}
                        >
                            {isFav(course._id) ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
                <div className="card-content">
                    <h3>{course.title}</h3>
                    <p>{course.category || course.description?.substring(0, 30)}</p>

                    {isRegistered && (
                        <div className="progress-wrapper">
                            <div className="progress-info">
                                <span className="progress-text">Progress</span>
                                <span className="progress-percent">{progressPercent}%</span>
                            </div>
                            <div className="progress-bar-bg" style={{ background: '#e0e7ff', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                                <div
                                    className="progress-bar-fill"
                                    style={{
                                        width: `${progressPercent}%`,
                                        background: '#6366f1',
                                        height: '100%',
                                        transition: 'width 0.3s ease'
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (loading) return <div className="page-container"><p>Loading courses...</p></div>;

    return (
        <div className="page-container home-page">
            {registeredCourses.length > 0 && (
                <section className="course-section">
                    <h2 className="section-header">Registered courses</h2>
                    <p className="section-sub">Continue your learning journey</p>

                    <div className="course-grid-4">
                        {registeredCourses.map((course) => (
                            <CourseCard key={course._id} course={course} isRegistered={true} />
                        ))}
                    </div>
                </section>
            )}

            <section className="course-section">
                <h2 className="section-header">All courses</h2>
                <p className="section-sub">Enroll new courses</p>

                <div className="course-grid-5">
                    {allCourses.length > 0 ? (
                        allCourses.map((course) => (
                            <CourseCard key={course._id} course={course} isSmall={true} />
                        ))
                    ) : (
                        <p>No courses available at the moment.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;