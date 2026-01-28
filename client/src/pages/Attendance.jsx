import React from 'react';
import '../styles/variables.css';
import '../styles/pages.css';

const Attendance = () => {
    // Mock attendance data
    const attendanceStats = [
        { course: 'MERN Stack', attended: 18, total: 20 },
        { course: 'Java Full Stack', attended: 15, total: 20 },
        { course: 'AI & ML', attended: 10, total: 10 },
    ];

    return (
        <div className="page-container">
            <h1>Attendance Tracking</h1>
            <div className="attendance-grid">
                {attendanceStats.map((item, index) => {
                    const percentage = Math.round((item.attended / item.total) * 100);
                    return (
                        <div key={index} className="attendance-card">
                            <h3>{item.course}</h3>
                            <div className="progress-circle" style={{ '--percentage': percentage }}>
                                <span className="percentage-text">{percentage}%</span>
                            </div>
                            <p className="stats-text">{item.attended}/{item.total} Classes Attended</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Attendance;
