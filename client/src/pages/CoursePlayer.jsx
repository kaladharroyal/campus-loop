import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseData } from '../data/courseData';
import '../styles/pages.css';

const CoursePlayer = () => {
    const { title } = useParams(); // Should match the route param
    const navigate = useNavigate();

    // Find course based on title (decoding URL percentage encoding)
    const decodedTitle = decodeURIComponent(title);

    // Fuzzy match or exact match logic
    const courseKey = Object.keys(courseData).find(key =>
        key.toLowerCase() === decodedTitle.toLowerCase() ||
        decodedTitle.toLowerCase().includes(key.toLowerCase())
    );

    const course = courseData[courseKey];

    const [activeLesson, setActiveLesson] = useState(null);

    useEffect(() => {
        if (course && course.lessons.length > 0) {
            setActiveLesson(course.lessons[0]);
        }
    }, [course]);

    if (!course) {
        return (
            <div className="page-container" style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Course not found</h2>
                <button className="primary-btn" onClick={() => navigate('/courses')}>
                    Browse Courses
                </button>
            </div>
        );
    }

    return (
        <div className="page-container course-player-container">
            <button className="back-link" onClick={() => navigate('/courses')}>
                ← Back to Courses
            </button>

            <div className="course-player-grid">
                {/* Main Video Area */}
                <div className="video-section">
                    <div className="video-wrapper">
                        {activeLesson ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${activeLesson.videoId}?autoplay=1${activeLesson.start ? `&start=${activeLesson.start}` : ''}`}
                                title={activeLesson.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="video-placeholder">Select a lesson to start</div>
                        )}
                    </div>
                    <div className="video-info">
                        <h1>{activeLesson?.title || course.title}</h1>

                        <p className="description">{course.description}</p>
                    </div>
                </div>

                {/* Lesson List Sidebar */}
                <div className="lesson-sidebar">
                    <h3>Course Content</h3>
                    <div className="lesson-list">
                        {course.lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className={`lesson-item ${activeLesson?.id === lesson.id ? 'active' : ''}`}
                                onClick={() => setActiveLesson(lesson)}
                            >
                                <div className="play-icon">
                                    {activeLesson?.id === lesson.id ? '▶' : '•'}
                                </div>
                                <div className="lesson-details">
                                    <span className="lesson-title">{lesson.id}. {lesson.title}</span>
                                    <span className="lesson-duration">{lesson.duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
