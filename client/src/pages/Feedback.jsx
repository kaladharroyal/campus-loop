import React, { useState } from 'react';
import '../styles/pages.css';

const Feedback = () => {
    const [view, setView] = useState('feedback'); // 'feedback', 'request', 'success'
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send data to backend
        setSuccessMsg(view === 'feedback' ? 'Thank you for your Feedback' : 'Thank you for Requesting');
        setView('success');
    };

    const handleContinue = () => {
        setView('feedback');
        setSuccessMsg('');
    };

    return (
        <div className="page-container">
            {view === 'success' ? (
                <div className="feedback-form-card" style={{ maxWidth: '600px', margin: '40px auto' }}>
                    <div className="success-message-container">
                        <h2>{successMsg}</h2>
                        <div className="success-icon">
                            ✓
                        </div>
                        <p style={{ color: '#666' }}>Your Request has been processed</p>
                        <button className="continue-btn" onClick={handleContinue}>Continue</button>
                    </div>
                </div>
            ) : view === 'request' ? (
                <div className="feedback-container">
                    <div className="feedback-form-card">
                        <div className="feedback-header">
                            <h2>Request For a Course</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name of the course or module</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter course name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Why this course is needed?</label>
                                <textarea
                                    className="form-control"
                                    rows="10"
                                    placeholder="Describe how this course helps..."
                                    required
                                    style={{ background: '#fff0f0', border: '1px solid #ffcccc' }}
                                ></textarea>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                <button type="submit" className="continue-btn" style={{ background: '#333' }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="feedback-container">
                    <div className="feedback-header">
                        <h2>Give your valuable feedback</h2>
                    </div>

                    <div className="feedback-form-card">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name of the course</label>
                                <select className="form-control" required>
                                    <option value="">select your course</option>
                                    <option value="NLP">NLP</option>
                                    <option value="Java">Java</option>
                                    <option value="MERN">MERN Stack</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Course Content Quality</label>
                                <input type="text" className="form-control" placeholder="enter the course content quality" />
                            </div>

                            <div className="form-group">
                                <label>Quality of Learning Materials</label>
                                <input type="text" className="form-control" placeholder="Quality of Learning Materials" />
                            </div>

                            <div className="form-group">
                                <label>Assignments & Assessments Quality</label>
                                <input type="text" className="form-control" placeholder="Assignments & Assessments Quality" />
                            </div>

                            <div className="form-group">
                                <label>Overall Course Rating</label>
                                <div className="rating-group">
                                    {[5, 4, 3, 2, 1].map(num => (
                                        <label key={num} className="rating-option">
                                            <input type="radio" name="overall" value={num} /> {num}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Confidence Level After Course</label>
                                <div className="rating-group">
                                    {[5, 4, 3, 2, 1].map(num => (
                                        <label key={num} className="rating-option">
                                            <input type="radio" name="confidence" value={num} /> {num}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Suggestions to improve this course</label>
                                <textarea className="form-control" rows="3" placeholder="type the feedback and suggestions..."></textarea>
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                <button type="submit" className="continue-btn" style={{ background: '#333' }}>Submit</button>
                            </div>

                            <div className="request-link-container">
                                <span className="request-link" onClick={() => setView('request')}>request for a new course</span>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feedback;
