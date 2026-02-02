import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import auth context
import '../styles/pages.css';

const CoursePlayer = () => {
    const { title } = useParams(); // Note: We might want to use ID instead of title for robustness
    const navigate = useNavigate();
    const { user } = useAuth();

    // State to hold dynamic course data
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch course data from API
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // Since our API gets by ID, but we have title in URL, we first need to find the course
                // For now, let's assume we can change the route to use ID or we search by ID if title matches.
                // NOTE: Best practice is to use ID in URL: /course/:id/play
                // But typically we might need to search. 

                // Fetch ALL courses to find match (inefficient but works for now without route change)
                // ideally we change route to use :id
                const response = await fetch('http://localhost:5000/api/courses');
                if (!response.ok) throw new Error('Failed to load courses');

                const data = await response.json();
                if (data.success) {
                    const decodedTitle = decodeURIComponent(title);
                    // Find course by title
                    const foundCourse = data.data.find(c => c.title === decodedTitle);

                    if (foundCourse) {
                        // We need full details including curriculum/lessons
                        // The list API might return summary, let's fetch individual if needed
                        // But wait, the list doesn't have lessons usually.
                        // Let's get the specific course ID
                        const detailResponse = await fetch(`http://localhost:5000/api/courses/${foundCourse._id}`);
                        const detailData = await detailResponse.json();

                        if (detailData.success) {
                            // Transform curriculum to flat lesson list for player
                            const flatLessons = [];
                            if (detailData.data.curriculum) {
                                let lessonId = 1;
                                detailData.data.curriculum.forEach(module => {
                                    if (module.topics) {
                                        module.topics.forEach(topic => {
                                            // Mocking video ID since it's not in schema yet
                                            // You need to add videoId to your backend schema!
                                            flatLessons.push({
                                                id: lessonId++,
                                                title: topic,
                                                duration: '10:00', // Placeholder
                                                videoId: 'eIrMbAQSU34' // Placeholder default video
                                            });
                                        });
                                    }
                                });
                            }

                            // If no curriculum, add a dummy lesson
                            if (flatLessons.length === 0) {
                                flatLessons.push({
                                    id: 1,
                                    title: 'Introduction',
                                    duration: '5:00',
                                    videoId: 'eIrMbAQSU34'
                                });
                            }

                            setCourse({ ...detailData.data, lessons: flatLessons });
                            setActiveLesson(flatLessons[0]);
                        } else {
                            setError('Course details not found');
                        }
                    } else {
                        setError('Course not found');
                    }
                }
            } catch (err) {
                console.error("Error loading course:", err);
                setError('Failed to load course');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [title]);

    if (loading) return <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>Loading Player...</div>;

    if (error || !course) {
        return (
            <div className="page-container" style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>{error || 'Course not found'}</h2>
                <button className="btn btn-primary" onClick={() => navigate('/courses')}>
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
                                src={`https://www.youtube-nocookie.com/embed/${activeLesson.videoId}?autoplay=1`}
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
