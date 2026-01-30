import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { quizData } from '../data/quizData';
import '../styles/pages.css';

const Assignments = () => {
    const { user } = useAuth();
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [viewMode, setViewMode] = useState('list'); // 'list', 'grid', 'calendar'
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    // Mock Assignments Data matching the user's screenshot
    const assignmentsList = [
        { id: 'FIG-122', title: 'JAVA Assignment 1', type: 'ASGN', priority: 'medium', date: 'Dec 21', owner: 'Instructor', subject: 'JAVA' },
        { id: 'FIG-121', title: 'DBMS Assignment 1', type: 'ASGN', priority: 'medium', date: 'Dec 21', owner: 'Instructor', subject: 'DBMS' },
        { id: 'FIG-120', title: 'DLCO Assignment 1', type: 'ASGN', priority: 'medium', date: 'Dec 21', owner: 'Instructor', subject: 'DLCO' },
        { id: 'FIG-119', title: 'Machine learning Assignment 1', type: 'ASGN', priority: 'Medium', date: 'Dec 21', owner: 'Instructor', subject: 'Machine Learning' },
        { id: 'FIG-118', title: 'NLP Assignment 1', type: 'ASGN', priority: 'Medium', date: 'Dec 21', owner: 'Instructor', subject: 'NLP' },
        { id: 'FIG-117', title: 'core python lab', type: 'Coding', priority: 'High', date: 'Dec 21', owner: 'Instructor', subject: 'Python' },
        { id: 'FIG-116', title: 'core java ab', type: 'coding', priority: 'Low', date: 'Dec 21', owner: 'Instructor', subject: 'JAVA' },
        { id: 'FIG-113', title: 'Quiz - 0215', type: 'Quiz', priority: 'High', date: 'Dec 21', owner: 'Instructor', subject: 'JAVA' },
    ];

    const subjects = ['All', 'DBMS', 'JAVA', 'DLCO', 'Machine Learning', 'NLP'];

    const handleStartQuiz = (subject, title) => {
        if (quizData[subject]) {
            setActiveQuiz({ subject, title });
            setCurrentQuestionIndex(0);
            setUserAnswers({});
            setShowResult(false);
        } else {
            alert('Quiz not available for this subject yet.');
        }
    };

    const handleAnswerOptionClick = (option) => {
        setUserAnswers({ ...userAnswers, [currentQuestionIndex]: option });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData[activeQuiz.subject].length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
        }
    };
    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleClearResponse = () => {
        setUserAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: null
        }));
    };

    const calculateScore = () => {
        let score = 0;
        const questions = quizData[activeQuiz.subject];
        questions.forEach((q, index) => {
            if (userAnswers[index] === q.answer) {
                score++;
            }
        });
        return score;
    };

    const handleCloseQuiz = () => {
        setActiveQuiz(null);
    };

    // Filter assignments
    const filteredAssignments = selectedSubject === 'All'
        ? assignmentsList
        : assignmentsList.filter(a => a.subject === selectedSubject);

    // View Renders
    const renderListView = () => (
        <div className="assignments-table-container">
            <table className="assignments-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Priority</th>
                        <th>Date</th>
                        <th>Owner</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssignments.map(assign => (
                        <tr key={assign.id} onClick={() => handleStartQuiz(assign.subject, assign.title)} className="clickable-row">
                            <td className="task-id">{assign.id}</td>
                            <td className="task-title">{assign.title}</td>
                            <td><span className={`type-badge ${assign.type.toLowerCase()}`}>{assign.type}</span></td>
                            <td><span className={`priority-badge ${assign.priority.toLowerCase()}`}>{assign.priority}</span></td>
                            <td>{assign.date}</td>
                            <td><div className="owner-avatar"></div></td>
                            <td>...</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderGridView = () => (
        <div className="assignments-grid-view">
            {filteredAssignments.map(assign => (
                <div key={assign.id} className="grid-assignment-card" onClick={() => handleStartQuiz(assign.subject, assign.title)}>
                    <div className="grid-card-header">
                        <span className={`type-badge ${assign.type.toLowerCase()}`}>{assign.type}</span>
                        <span className="task-date">{assign.date}</span>
                    </div>
                    <h4>{assign.title}</h4>
                    <p className="task-subject">{assign.subject}</p>
                    <div className="grid-card-footer">
                        <span className={`priority-badge ${assign.priority.toLowerCase()}`}>{assign.priority}</span>
                        <div className="owner-avatar small"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderCalendarView = () => (
        <div className="calendar-view-placeholder">
            <h3>December 2025</h3>
            <div className="calendar-grid">
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                    const hasAssignment = filteredAssignments.find(a => a.date === `Dec ${day}`);
                    return (
                        <div key={day} className={`calendar-day ${hasAssignment ? 'has-event' : ''}`}>
                            <span className="day-number">{day}</span>
                            {hasAssignment && (
                                <div className="calendar-event-dot" title={hasAssignment.title}></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // --- RENDER QUIZ ---
    if (activeQuiz) {
        const questions = quizData[activeQuiz.subject];
        const currentQuestion = questions[currentQuestionIndex];
        const totalQuestions = questions.length;

        if (showResult) {
            const score = calculateScore();
            const percentage = Math.round((score / totalQuestions) * 100);
            return (
                <div className="page-container quiz-container">
                    <div className="quiz-result-card">
                        <h2>Quiz Results</h2>
                        <div
                            className={`score-circle ${percentage >= 70
                                    ? "good"
                                    : percentage >= 40
                                        ? "average"
                                        : "poor"
                                }`}
                            style={{ "--progress": `${percentage}%` }}
                        >
                            <span>{score} / {totalQuestions}</span>
                        </div>

                        <p>{score > 5 ? 'Good Job!' : 'Keep Practicing!'}</p>
                        <button id='backToAssignmentsBtn' className="primary-btn" onClick={handleCloseQuiz}>Back to Assignments</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="page-container quiz-container">
                <div className="quiz-header">
                    <h2>{activeQuiz.title}</h2>
                    <span className="timer">Time Remaining: --:--</span>
                </div>
                <div className="quiz-progress-bar">
                    <div className="progress-fill" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
                <div className="question-card">
                    <h3>Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
                    <p className="question-text">{currentQuestion.question}</p>
                    <div className="options-grid">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                className={`option-btn ${userAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
                                onClick={() => handleAnswerOptionClick(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="quiz-actions">
                        <button
                            id="clearResponseBtn"
                            className="secondary-btn"
                            onClick={handleClearResponse}
                            disabled={userAnswers[currentQuestionIndex] == null}
                        >
                            Clear Response
                        </button>

                        <div className="right-actions">
                            <button
                                id="prevQuestionBtn"
                                className="secondary-btn"
                                onClick={handlePrevQuestion}
                                disabled={currentQuestionIndex === 0}
                            >
                                Prev
                            </button>

                            <button
                                id="nextQuestionBtn"
                                className="primary-btn"
                                onClick={handleNextQuestion}
                                disabled={userAnswers[currentQuestionIndex] == null}
                            >
                                {currentQuestionIndex === totalQuestions - 1 ? "Submit" : "Next"}
                            </button>
                        </div>
                    </div>



                </div>
            </div>
        );
    }

    // --- RENDER ASSIGNMENTS UI ---
    return (
        <div className="assignments-layout">
            {/* Left Sidebar for Subjects */}
            <div className="assignments-sidebar">
                <h3>Assignments</h3>
                <ul className="subject-list">
                    {subjects.map(sub => (
                        <li
                            key={sub}
                            className={selectedSubject === sub ? 'active' : ''}
                            onClick={() => setSelectedSubject(sub)}
                        >
                            <span className="dot"></span> {sub}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="assignments-content">
                <div className="content-header-column">
                    <h2>Active Assignments and Tasks</h2>
                    <div className="controls-row">
                        <div className="search-filter-group">
                            <div className="search-wrapper">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <input type="text" placeholder="Search Assignments and tasks" className="search-input-styled" />
                            </div>
                            <button className="filter-btn-styled">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                                Filter
                            </button>
                        </div>
                        <div className="view-toggles-styled">
                            <button
                                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                            </button>
                            <button
                                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            </button>
                            <button
                                className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                                onClick={() => setViewMode('calendar')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {viewMode === 'list' && renderListView()}
                {viewMode === 'grid' && renderGridView()}
                {viewMode === 'calendar' && renderCalendarView()}

            </div>
        </div>
    );
};

export default Assignments;
