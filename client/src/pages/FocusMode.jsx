import React, { useState, useEffect } from 'react';
import '../styles/pages.css';

import { useNavigate } from 'react-router-dom';

const FocusMode = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedMood, setSelectedMood] = useState(null);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            setShowFeedback(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(25 * 60);
        setShowFeedback(false);
    };

    const endSession = () => {
        setIsActive(false);
        setShowFeedback(true);
    };

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
        // Here you would save the feedback to backend or local storage
        console.log(`User mood: ${mood}`);

        // Simulate saving
        setTimeout(() => {
            resetTimer();
            navigate('/dashboard');
        }, 500);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>

            {!showFeedback ? (
                <>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Focus Mode</h1>
                    <p style={{ color: '#666', marginBottom: '40px' }}>Stay focused and productive. Timer set for 25 minutes.</p>

                    <div className="timer-display" style={{
                        fontSize: '6rem',
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        color: isActive ? '#009688' : '#333',
                        marginBottom: '40px'
                    }}>
                        {formatTime(timeLeft)}
                    </div>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button
                            className="continue-btn"
                            style={{
                                background: isActive ? '#ff9800' : '#009688',
                                fontSize: '1.2rem',
                                padding: '15px 40px'
                            }}
                            onClick={toggleTimer}
                        >
                            {isActive ? 'Pause' : 'Start Focus'}
                        </button>

                        <button
                            className="continue-btn"
                            style={{ background: '#333', fontSize: '1.2rem', padding: '15px 40px' }}
                            onClick={endSession}
                        >
                            End Session
                        </button>
                    </div>
                </>
            ) : (
                <div className="feedback-form-card" style={{ textAlign: 'center', maxWidth: '500px' }}>
                    <h2>Session Complete!</h2>
                    <p style={{ marginBottom: '30px', color: '#666' }}>How do you feel about this learning session?</p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '3rem', cursor: 'pointer' }}>
                        <div onClick={() => handleMoodSelect('happy')} style={{ transform: selectedMood === 'happy' ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.2s' }}>
                            😊
                            <p style={{ fontSize: '1rem', marginTop: '10px' }}>Confident</p>
                        </div>
                        <div onClick={() => handleMoodSelect('neutral')} style={{ transform: selectedMood === 'neutral' ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.2s' }}>
                            😐
                            <p style={{ fontSize: '1rem', marginTop: '10px' }}>Okay</p>
                        </div>
                        <div onClick={() => handleMoodSelect('sad')} style={{ transform: selectedMood === 'sad' ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.2s' }}>
                            😞
                            <p style={{ fontSize: '1rem', marginTop: '10px' }}>Confused</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FocusMode;
