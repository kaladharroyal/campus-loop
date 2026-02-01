import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import dbms from '../assets/DBMS.JPG';
import java from '../assets/java.png';
import mern from '../assets/mern-stack.png';
import ml from '../assets/machine-learning.png';
import nlp from '../assets/nlp.png';
import ai from '../assets/programming-for-ai.png';
import ai2 from '../assets/ai.png';
import dl from '../assets/deep-learning.png';
import cn from '../assets/computer-networks.png';

const Home = () => {
    const navigate = useNavigate();

    const registeredCourses = [
        { title: 'DBMS', sub: 'Database management system', img: dbms, color: '#6366f1', progress: 65 },
        { title: 'JAVA', sub: 'programming with java', img: java, color: '#f97316', progress: 42 },
        { title: 'MERN Stack dev', sub: 'MERN stack development', img: mern, color: '#0ea5e9', progress: 78 },
        { title: 'Machine Learning', sub: 'introduction to machine learning', img: ml, color: '#8b5cf6', progress: 23 },
    ];

    const allCourses = [
        { title: 'NLP', sub: 'NLP Using python', img: nlp, color: '#10b981' },
        { title: 'Programming for AI', sub: 'python', img: ai, color: '#f59e0b' },
        { title: 'Artificial intelligence', sub: 'fundamentals of ai', img: ai2, color: '#ec4899' },
        { title: 'Deep Learning', sub: 'DL using python', img: dl, color: '#6366f1' },
        { title: 'Computer Netwoks', sub: 'CN', img: cn, color: '#14b8a6' },
    ];

    const displayAll = [...allCourses, ...allCourses];

    const [favorites, setFavorites] = React.useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleFavorite = (course) => {
        setFavorites(prev => {
            const exists = prev.find(c => c.title === course.title);
            let newFavs;
            if (exists) {
                newFavs = prev.filter(c => c.title !== course.title);
            } else {
                newFavs = [...prev, course];
            }
            localStorage.setItem('favorites', JSON.stringify(newFavs));
            return newFavs;
        });
    };

    const isFav = (title) => favorites.some(c => c.title === title);

    const handleCourseClick = (title) => {
        let searchTitle = title;
        if (title === 'MERN Stack dev') searchTitle = 'MERN';
        navigate(`/course/${encodeURIComponent(searchTitle)}`);
    };

    const CourseCard = ({ course, isSmall = false }) => (
        <div
            className={`campus-card ${!isSmall ? 'registered' : ''}`}
            onClick={() => handleCourseClick(course.title)}
        >
            <div
                className={`card-image-placeholder ${isSmall ? 'small' : ''}`}
                style={{ '--accent': course.color }}
            >
                <img src={course.img} alt={course.title} />
                <button
                    className={`fav-btn ${isFav(course.title) ? 'active' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(course);
                    }}
                >
                    {isFav(course.title) ? '❤️' : '🤍'}
                </button>
            </div>
            <div className="card-content">
                <h3>{course.title}</h3>
                <p>{course.sub}</p>
                {!isSmall && course.progress !== undefined && (
                    <div className="progress-wrapper">
                        <div className="progress-info">
                            <span className="progress-text">Progress</span>
                            <span className="progress-percent">{course.progress}%</span>
                        </div>
                        <div className="progress-bar-bg">
                            <div
                                className="progress-bar-fill"
                                style={{
                                    width: `${course.progress}%`,
                                    background: course.color
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="page-container home-page">
            <section className="course-section">
                <h2 className="section-header">Registered courses</h2>
                <p className="section-sub">Continue your learning journey</p>

                <div className="course-grid-4">
                    {registeredCourses.map((course, i) => (
                        <CourseCard key={i} course={course} />
                    ))}
                </div>
            </section>

            <section className="course-section">
                <h2 className="section-header">All courses</h2>
                <p className="section-sub">Enroll new courses</p>

                <div className="course-grid-5">
                    {displayAll.map((course, i) => (
                        <CourseCard key={i} course={course} isSmall={true} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;