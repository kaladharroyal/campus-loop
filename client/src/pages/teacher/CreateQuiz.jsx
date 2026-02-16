import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import '../../styles/teacher.css';
import API_BASE_URL from '../../config/api';

const CreateQuiz = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    // Basic Quiz Info
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        course: '',
        dueDate: '',
        duration: 30, // Default 30 mins
        maxGrade: 100
    });

    // Questions State
    const [questions, setQuestions] = useState([
        {
            id: Date.now(),
            questionText: '',
            marks: 5,
            options: [
                { id: 1, text: '', isCorrect: false },
                { id: 2, text: '', isCorrect: false }
            ]
        }
    ]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            // Fixed: Using backticks for template literal
            const response = await fetch(`${API_BASE_URL}/api/teacher/courses`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setCourses(data.data.filter(c => c.status === 'published'));
            }
        } catch (err) {
            console.error(err);
        }
    };

    // --- Handlers for Basic Info ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- Handlers for Questions ---
    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: Date.now(),
                questionText: '',
                marks: 5,
                options: [
                    { id: Date.now() + 1, text: '', isCorrect: false },
                    { id: Date.now() + 2, text: '', isCorrect: false }
                ]
            }
        ]);
    };

    const removeQuestion = (id) => {
        if (questions.length === 1) return;
        setQuestions(questions.filter(q => q.id !== id));
    };

    const handleQuestionChange = (id, field, value) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ));
    };

    // --- Handlers for Options ---
    const addOption = (questionId) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    options: [...q.options, { id: Date.now(), text: '', isCorrect: false }]
                };
            }
            return q;
        }));
    };

    const removeOption = (questionId, optionId) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                if (q.options.length <= 2) return q; // Min 2 options
                return {
                    ...q,
                    options: q.options.filter(o => o.id !== optionId)
                };
            }
            return q;
        }));
    };

    const handleOptionChange = (questionId, optionId, text) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    options: q.options.map(o => o.id === optionId ? { ...o, text } : o)
                };
            }
            return q;
        }));
    };

    const markCorrectOption = (questionId, optionId) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    options: q.options.map(o => ({
                        ...o,
                        isCorrect: o.id === optionId // Only one correct for now
                    }))
                };
            }
            return q;
        }));
    };

    // --- Submit ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Calculate total marks from questions to validate/overwrite maxGrade
        const totalMarks = questions.reduce((sum, q) => sum + parseInt(q.marks || 0), 0);

        // Clean up questions for backend (remove random IDs)
        const cleanedQuestions = questions.map(q => ({
            questionText: q.questionText,
            marks: q.marks,
            options: q.options.map(o => ({
                text: o.text,
                isCorrect: o.isCorrect
            }))
        }));

        const payload = {
            ...formData,
            maxGrade: totalMarks, // Auto-set maxGrade based on questions
            type: 'quiz',
            questions: cleanedQuestions
        };

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            // Fixed: Using backticks for template literal
            const response = await fetch(`${API_BASE_URL}/api/assignments`, { // Using new controller route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) { // Check status code, not data.success for this endpoint
                alert('Quiz created successfully!');
                navigate('/teacher/assignments');
            } else {
                alert(data.message || 'Failed to create quiz');
            }
        } catch (err) {
            console.error(err);
            alert('Error creating quiz');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Create Quiz</h1>
                <button className="btn btn-secondary" onClick={() => navigate('/teacher/assignments')}>
                    Back
                </button>
            </div>

            <form onSubmit={handleSubmit} className="course-form">
                {/* Basic Info Section */}
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-group">
                        <label>Quiz Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., React Basics Quiz" />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Course</label>
                            <select name="course" value={formData.course} onChange={handleChange} required>
                                <option value="">-- Select Course --</option>
                                {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Due Date</label>
                            <input type="datetime-local" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Duration (mins)</label>
                            <input type="number" name="duration" value={formData.duration} onChange={handleChange} min="5" required />
                        </div>
                    </div>
                </div>

                {/* Questions Builder */}
                <div className="form-section">
                    <h3>Questions Builder</h3>
                    <AnimatePresence>
                        {questions.map((q, index) => (
                            <motion.div
                                key={q.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="quiz-question-card"
                                style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #dee2e6' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h4>Question {index + 1}</h4>
                                    <button type="button" className="icon-btn delete-btn" onClick={() => removeQuestion(q.id)} title="Remove Question">
                                        <FaTrash />
                                    </button>
                                </div>

                                <div className="form-row">
                                    <div className="form-group" style={{ flex: 3 }}>
                                        <input
                                            type="text"
                                            placeholder="Enter question text..."
                                            value={q.questionText}
                                            onChange={(e) => handleQuestionChange(q.id, 'questionText', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <input
                                            type="number"
                                            placeholder="Marks"
                                            value={q.marks}
                                            onChange={(e) => handleQuestionChange(q.id, 'marks', e.target.value)}
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Options */}
                                <div className="options-list">
                                    {q.options.map((opt, oIndex) => (
                                        <div key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                                            <div
                                                onClick={() => markCorrectOption(q.id, opt.id)}
                                                style={{ cursor: 'pointer', color: opt.isCorrect ? '#28a745' : '#6c757d', fontSize: '1.2rem' }}
                                                title="Mark as Correct Answer"
                                            >
                                                {opt.isCorrect ? <FaCheckCircle /> : <FaRegCircle />}
                                            </div>
                                            <input
                                                type="text"
                                                placeholder={`Option ${oIndex + 1}`}
                                                value={opt.text}
                                                onChange={(e) => handleOptionChange(q.id, opt.id, e.target.value)}
                                                required
                                                style={{ flex: 1 }}
                                            />
                                            {q.options.length > 2 && (
                                                <button type="button" className="icon-btn" onClick={() => removeOption(q.id, opt.id)}>
                                                    &times;
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" className="btn-text" onClick={() => addOption(q.id)} style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                        + Add Option
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <button type="button" className="btn btn-secondary" onClick={addQuestion} style={{ width: '100%', borderStyle: 'dashed' }}>
                        <FaPlus /> Add Question
                    </button>
                </div>

                <div className="form-actions">
                    <div style={{ marginRight: 'auto', fontWeight: 'bold' }}>
                        Total Marks: {questions.reduce((sum, q) => sum + parseInt(q.marks || 0), 0)}
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Publishing Quiz...' : 'Publish Quiz'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuiz;
