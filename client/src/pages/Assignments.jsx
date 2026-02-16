import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/pages.css';
import API_BASE_URL from '../config/api';
import { FiList, FiGrid, FiCalendar } from 'react-icons/fi';

const Assignments = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [viewMode, setViewMode] = useState('list'); // 'list', 'grid', 'calendar'

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            // Fetch assignments (student view)
            // Note: GET /api/assignments returns all or filter by course. 
            // Ideally we need an endpoint for "my enrolled course assignments"
            // For now, using the same endpoint but we might need to filter on client or update backend
            const response = await fetch(`${API_BASE_URL}/api/assignments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                setAssignments(data);
            }
        } catch (err) {
            console.error("Failed to load assignments", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAssignmentClick = (assignment) => {
        if (assignment.type === 'quiz') {
            navigate(`/quiz/${assignment._id}`);
        } else {
            // For normal assignments, go to details page
            navigate(`/assignment/${assignment._id}`);
        }
    };

    // Filter assignments
    const filteredAssignments = selectedSubject === 'All'
        ? assignments
        : assignments.filter(a => a.course?.title === selectedSubject || a.subject === selectedSubject);

    // Get unique subjects from assignments for filter sidebar
    const subjects = ['All', ...new Set(assignments.map(a => a.course?.title || 'General').filter(Boolean))];

    if (loading) return <div className="page-container">Loading assignments...</div>;

    // View Renders
    const renderListView = () => (
        <div className="assignments-table-container">
            <table className="assignments-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Course</th>
                        <th>Type</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssignments.map(assign => (
                        <tr key={assign._id} onClick={() => handleAssignmentClick(assign)} className="clickable-row">
                            <td className="task-title">{assign.title}</td>
                            <td>{assign.course?.title || 'General'}</td>
                            <td><span className={`type-badge ${assign.type}`}>{assign.type}</span></td>
                            <td>{new Date(assign.dueDate).toLocaleDateString()}</td>
                            <td><span className={`priority-badge ${assign.status}`}>{assign.status}</span></td>
                            <td>
                                <button className="btn-small btn-primary">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderGridView = () => (
        <div className="assignments-grid-view">
            {filteredAssignments.map(assign => (
                <div key={assign._id} className="grid-assignment-card" onClick={() => handleAssignmentClick(assign)}>
                    <div className="grid-card-header">
                        <span className={`type-badge ${assign.type}`}>{assign.type}</span>
                        <span className="task-date">{new Date(assign.dueDate).toLocaleDateString()}</span>
                    </div>
                    <h4>{assign.title}</h4>
                    <p className="task-subject">{assign.course?.title || 'General'}</p>
                    <div className="grid-card-footer">
                        <span className={`priority-badge ${assign.status}`}>{assign.status}</span>
                    </div>
                </div>
            ))}
        </div>
    );



    // Helper to get days in month
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const renderCalendarView = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

        // Create array of days
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null); // Empty slots for previous month
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return (
            <div className="calendar-view-container">
                <div className="calendar-header">
                    <h3>{today.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                </div>
                <div className="calendar-grid">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="calendar-day-header">{day}</div>
                    ))}
                    {days.map((day, index) => {
                        // Find assignments for this day (based on due date)
                        const dayAssignments = day ? filteredAssignments.filter(a => {
                            const d = new Date(a.dueDate);
                            return d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
                        }) : [];

                        return (
                            <div key={index} className={`calendar-day ${day ? '' : 'empty'}`}>
                                {day && <span className="day-number">{day}</span>}
                                {day && dayAssignments.map(assign => (
                                    <div
                                        key={assign._id}
                                        className={`calendar-event type-${assign.type}`}
                                        onClick={(e) => { e.stopPropagation(); handleAssignmentClick(assign); }}
                                        title={`${assign.title} (Due: ${new Date(assign.dueDate).toLocaleTimeString()})`}
                                    >
                                        {assign.title}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

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
                    <h2>My Assignments & Quizzes</h2>
                    <div className="controls-row">
                        <div className="view-toggles-styled">
                            <button
                                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                title="List View"
                            >
                                <FiList />
                            </button>
                            <button
                                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Grid View"
                            >
                                <FiGrid />
                            </button>
                            <button
                                className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                                onClick={() => setViewMode('calendar')}
                                title="Calendar View"
                            >
                                <FiCalendar />
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

