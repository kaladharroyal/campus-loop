import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    const enrolledRes = await fetch('http://localhost:5000/api/courses/mycourses', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const enrolledData = await enrolledRes.json();
                    if (Array.isArray(enrolledData)) {
                        setRegisteredCourses(enrolledData);
                    }
                }

                // Fetch All Courses
                const allRes = await fetch('http://localhost:5000/api/courses');
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

    const CourseCard = ({ course, isSmall = false, isRegistered = false }) => (
        <div
            className={`campus-card ${!isSmall ? 'registered' : ''}`}
            onClick={() => handleCourseClick(course._id)}
        >
            <div
                className={`card-image-placeholder ${isSmall ? 'small' : ''}`}
                style={{ '--accent': '#6366f1' }} // Default accent color
            >
                {/* Use thumbnail or a placeholder color/icon */}
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
            <div className="card-content">
                <h3>{course.title}</h3>
                <p>{course.category || course.description?.substring(0, 30)}</p>

                {isRegistered && (
                    <div className="progress-wrapper">
                        <div className="progress-info">
                            <span className="progress-text">Progress</span>
                            <span className="progress-percent">0%</span> {/* Placeholder progress */}
                        </div>
                        <div className="progress-bar-bg">
                            <div
                                className="progress-bar-fill"
                                style={{
                                    width: `0%`,
                                    background: '#6366f1'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

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