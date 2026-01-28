import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';
import dbms from '../assets/dbms.png';
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
        { title: 'DBMS', sub: 'Database management system', img: dbms, color: '#0F172A' },
        { title: 'JAVA', sub: 'programming with java', img: java, color: '#EA580C' },
        { title: 'MERN Stack dev', sub: 'MERN stack development', img: mern, color: '#0F766E' },
        { title: 'Machine Learning', sub: 'introduction to machine learning', img: ml, color: '#1E3A8A' },
    ];

    const allCourses = [
        { title: 'NLP', sub: 'NLP Using python', img: nlp },
        { title: 'Programming for AI', sub: 'python', img: ai },
        { title: 'Artificial intelligence', sub: 'fundamentals of ai', img: ai2 },
        { title: 'Deep Learning', sub: 'DL using python', img: dl },
        { title: 'Computer Netwoks', sub: 'CN', img: cn },
    ];

    // Repeat for second row just to match visual volume if needed
    const displayAll = [...allCourses, ...allCourses];

    // Favorites Logic
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
        // Handle "MERN Stack dev" -> "MERN" mapping if needed, or update courseData to match titles exactly.
        // For now, let's assume we map "MERN Stack dev" to "MERN" based on inclusion or update logical mapping.
        let searchTitle = title;
        if (title === 'MERN Stack dev') searchTitle = 'MERN';

        navigate(`/course/${encodeURIComponent(searchTitle)}`);
    };

    const CourseCard = ({ course, isSmall = false }) => (
        <div
            className={`campus-card ${!isSmall ? 'registered' : ''}`}
            onClick={() => handleCourseClick(course.title)}
            style={{ cursor: 'pointer' }}
        >
            <div className={`card-image-placeholder ${isSmall ? 'small' : ''}`} style={course.color ? { background: course.color } : { background: '#1e293b' }}>
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
            </div>
        </div>
    );

    return (
        <div className="page-container home-page">
            <section className="course-section">
                <h2 className="section-header">Registered courses</h2>
                <p className="section-sub">see the registered courses</p>

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
