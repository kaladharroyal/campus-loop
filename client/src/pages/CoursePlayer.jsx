import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/pages.css';
import API_BASE_URL from '../config/api';

const CoursePlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // State to hold dynamic course data
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Progress State
    const [completedLessons, setCompletedLessons] = useState([]);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [isCourseCompleted, setIsCourseCompleted] = useState(false);

    // Fetch course data from API
    useEffect(() => {
        const fetchCourseAndProgress = async () => {
            try {
                if (!id) return;
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const token = userInfo?.token;

                // 1. Fetch Course Details
                const courseResponse = await fetch(`${API_BASE_URL}/api/courses/${id}`);

                if (!courseResponse.ok) {
                    if (courseResponse.status === 404) throw new Error('Course not found');
                    throw new Error('Failed to load course details');
                }

                const courseDataRes = await courseResponse.json();

                if (courseDataRes.success) {
                    const courseData = courseDataRes.data;

                    // Helper to extract YouTube ID
                    const getYoutubeId = (url) => {
                        if (!url) return 'eIrMbAQSU34'; // Default placeholder
                        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                        const match = url.match(regExp);
                        return (match && match[2].length === 11) ? match[2] : 'eIrMbAQSU34';
                    };

                    const courseVideoId = getYoutubeId(courseData.videoLink);

                    // Transform curriculum to flat lesson list for player
                    const flatLessons = [];
                    if (courseData.curriculum) {
                        let lessonIndex = 1;
                        courseData.curriculum.forEach(module => {
                            if (module.topics) {
                                module.topics.forEach(topic => {
                                    const isObject = typeof topic === 'object';
                                    const title = isObject ? topic.title : topic;
                                    const startTime = isObject ? (topic.time || 0) : 0;
                                    // Use topic._id if available, otherwise generate a consistent ID based on index
                                    // Ideally backend should provide unique IDs for all topics. 
                                    const lessonId = isObject && topic._id ? topic._id : `lesson-${lessonIndex}`;

                                    flatLessons.push({
                                        id: lessonId,
                                        index: lessonIndex++,
                                        title: title,
                                        duration: '10:00', // Placeholder
                                        videoId: courseVideoId,
                                        start: startTime
                                    });
                                });
                            }
                        });
                    }

                    // If no curriculum, add a dummy lesson
                    if (flatLessons.length === 0) {
                        flatLessons.push({
                            id: 'lesson-1',
                            index: 1,
                            title: 'Introduction',
                            duration: '5:00',
                            videoId: courseVideoId
                        });
                    }

                    // 2. Fetch User Progress
                    let userProgress = { completedLessons: [], lastAccessedLessonId: null, isCompleted: false };
                    if (token) {
                        try {
                            const progressResponse = await fetch(`${API_BASE_URL}/api/courses/${id}/progress`, {
                                headers: { 'Authorization': `Bearer ${token}` }
                            });
                            if (progressResponse.ok) {
                                const progressData = await progressResponse.json();
                                if (progressData.success) {
                                    userProgress = progressData.data;
                                }
                            }
                        } catch (err) {
                            console.error("Failed to load progress", err);
                        }
                    }

                    setCompletedLessons(userProgress.completedLessons || []);
                    setIsCourseCompleted(userProgress.isCompleted || false);

                    // Calculate initial progress
                    const percent = Math.round(((userProgress.completedLessons?.length || 0) / flatLessons.length) * 100);
                    setProgressPercentage(percent);

                    // Determine active lesson (Resume or Start)
                    let initialLesson = flatLessons[0];
                    if (userProgress.lastAccessedLessonId) {
                        console.log("Resuming from:", userProgress.lastAccessedLessonId);
                        const last = flatLessons.find(l => l.id === userProgress.lastAccessedLessonId);
                        if (last) {
                            console.log("Found lesson:", last);
                            initialLesson = last;
                        } else {
                            console.warn("Last accessed lesson ID not found in current course lessons:", userProgress.lastAccessedLessonId);
                        }
                    } else {
                        console.log("No last accessed lesson found, starting from beginning.");
                    }

                    setCourse({ ...courseData, lessons: flatLessons });
                    setActiveLesson(initialLesson);
                } else {
                    setError('Course details not found');
                }
            } catch (err) {
                console.error("Error loading course:", err);
                setError(err.message || 'Failed to load course');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseAndProgress();
    }, [id]);

    const handleLessonComplete = async (lessonId) => {
        if (completedLessons.includes(lessonId)) return;

        const newCompleted = [...completedLessons, lessonId];
        setCompletedLessons(newCompleted);

        // Calculate new progress
        const percent = Math.round((newCompleted.length / course.lessons.length) * 100);
        setProgressPercentage(percent);

        // Update Backend
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            if (!token) return;

            await fetch(`${API_BASE_URL}/api/courses/${id}/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ lessonId, completed: true })
            });

            // Check for Course Completion
            if (newCompleted.length === course.lessons.length) {
                setIsCourseCompleted(true);
                await fetch(`${API_BASE_URL}/api/courses/${id}/complete`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                // Redirect to Home after a delay
                setTimeout(() => {
                    alert("Congratulations! You have completed the course.");
                    navigate('/');
                }, 1000); // 1.5s delay
            } else {
                // Auto-advance to next lesson
                const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
                if (currentIndex !== -1 && currentIndex < course.lessons.length - 1) {
                    const nextLesson = course.lessons[currentIndex + 1];
                    setActiveLesson(nextLesson);
                    // Update last accessed for the new lesson
                    handleLessonChange(nextLesson);
                }
            }

        } catch (err) {
            console.error("Failed to update progress", err);
            alert("Failed to save progress. Please check your internet connection or try again.");
        }
    };

    const handleLessonChange = async (lesson) => {
        setActiveLesson(lesson);

        // Update last accessed in backend without marking as complete
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            if (!token) return;

            await fetch(`${API_BASE_URL}/api/courses/${id}/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ lessonId: lesson.id })
            });
        } catch (err) {
            console.error("Failed to update last accessed", err);
        }
    };

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
            <div className="player-header">
                <button className="back-link" onClick={() => navigate('/dashboard')}>
                    ← Back to Dashboard
                </button>
                <div className="course-progress-container">
                    <span>{progressPercentage}% Completed</span>
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="course-player-grid">
                {/* Main Video Area */}
                <div className="video-section">
                    <div className="video-wrapper">
                        {activeLesson ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube-nocookie.com/embed/${activeLesson.videoId}?autoplay=1${activeLesson.start ? `&start=${activeLesson.start}` : ''}`}
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1>{activeLesson?.title || course.title}</h1>
                            {activeLesson && (
                                <button
                                    className={`btn ${completedLessons.includes(activeLesson.id) ? 'btn-success' : 'btn-primary'}`}
                                    onClick={() => handleLessonComplete(activeLesson.id)}
                                    disabled={completedLessons.includes(activeLesson.id)}
                                >
                                    {completedLessons.includes(activeLesson.id) ? 'Completed' : 'Mark as Complete'}
                                </button>
                            )}
                        </div>
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
                                className={`lesson-item ${activeLesson?.id === lesson.id ? 'active' : ''} ${completedLessons.includes(lesson.id) ? 'completed' : ''}`}
                                onClick={() => handleLessonChange(lesson)}
                            >
                                <div className="play-icon">
                                    {completedLessons.includes(lesson.id) ? '✓' : (activeLesson?.id === lesson.id ? '▶' : '•')}
                                </div>
                                <div className="lesson-details">
                                    <span className="lesson-title">{lesson.index}. {lesson.title}</span>
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
