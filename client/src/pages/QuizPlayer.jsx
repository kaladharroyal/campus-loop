import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import '../styles/student.css'; // Assuming this exists or using generic styles
import API_BASE_URL from '../config/api';

const QuizPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // { questionId: optionId }
    const [timeLeft, setTimeLeft] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);

    // Load Quiz
    useEffect(() => {
        fetchQuiz();
    }, [id]);

    // Timer Logic
    useEffect(() => {
        if (!quiz || submitted || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Auto-submit
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [quiz, submitted, timeLeft]);

    const fetchQuiz = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            // Using assignments endpoint, assuming it handles fetching by ID
            const response = await fetch(`${API_BASE_URL}/api/assignments/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();

            if (response.ok) { // assignmentController returns object directly
                setQuiz(data);
                setTimeLeft(data.duration ? data.duration * 60 : 30 * 60); // Default 30 mins if 0
            } else {
                alert('Failed to load quiz');
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (questionId, optionId) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleSubmit = async () => {
        setSubmitted(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        // Transform answers to array format expected by backend
        const quizAnswersArray = Object.keys(answers).map(qId => ({
            questionId: qId,
            selectedOptionId: answers[qId]
        }));

        try {
            const response = await fetch(`${API_BASE_URL}/api/assignments/${id}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    quizAnswers: quizAnswersArray
                })
            });

            const data = await response.json();
            if (response.ok) {
                setScore(data.score); // Backend returns the submission with score
            } else {
                alert(data.message || 'Submission failed');
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (loading) return <div className="loading-spinner">Loading Quiz...</div>;
    if (!quiz) return <div>Quiz not found</div>;

    // Result View
    if (submitted && score !== null) {
        return (
            <div className="page-container" style={{ textAlign: 'center', marginTop: '50px' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="quiz-result-card"
                >
                    <FaCheckCircle size={60} color="#28a745" />
                    <h1>Quiz Completed!</h1>
                    <h2>Your Score: {score} / {quiz.maxGrade}</h2>
                    <p>Great job! You can review your results in the assignments tab.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/assignments')}>
                        Back to Assignments
                    </button>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    return (
        <div className="quiz-player-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            {/* Header */}
            <div className="quiz-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <div>
                    <h3>{quiz.title}</h3>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </div>
                </div>
                <div className={`timer ${timeLeft < 60 ? 'timer-warning' : ''}`} style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaClock /> {formatTime(timeLeft)}
                </div>
            </div>

            {/* Progress Bar */}
            <div style={{ height: '5px', background: '#e9ecef', borderRadius: '5px', marginBottom: '30px' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: '#007bff', borderRadius: '5px', transition: 'width 0.3s' }}></div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="question-card"
                >
                    <h2 style={{ marginBottom: '20px' }}>{currentQuestion.questionText}</h2>

                    <div className="options-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {currentQuestion.options.map(option => (
                            <div
                                key={option._id}
                                className={`option-item ${answers[currentQuestion._id] === option._id ? 'selected' : ''}`}
                                onClick={() => handleOptionSelect(currentQuestion._id, option._id)}
                                style={{
                                    padding: '15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    background: answers[currentQuestion._id] === option._id ? '#e3f2fd' : '#fff',
                                    borderColor: answers[currentQuestion._id] === option._id ? '#007bff' : '#ddd',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{
                                        width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #ccc',
                                        background: answers[currentQuestion._id] === option._id ? '#007bff' : 'transparent',
                                        borderColor: answers[currentQuestion._id] === option._id ? '#007bff' : '#ccc'
                                    }}></div>
                                    {option.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="quiz-navigation" style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                <button
                    className="btn btn-secondary"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                >
                    Previous
                </button>

                {currentQuestionIndex < quiz.questions.length - 1 ? (
                    <button
                        className="btn btn-primary"
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        className="btn btn-success"
                        onClick={handleSubmit}
                        style={{ background: '#28a745', color: '#fff' }}
                    >
                        Submit Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizPlayer;
