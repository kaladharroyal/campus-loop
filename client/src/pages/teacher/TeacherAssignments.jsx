import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/teacher.css';
import API_BASE_URL from '../../config/api';

const TeacherAssignments = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModal, setDeleteModal] = useState(null);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            // Fixed: Using backticks for template literal
            const response = await fetch(`${API_BASE_URL}/api/teacher/assignments`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setAssignments(data.data);
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to load assignments');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (assignmentId) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            const response = await fetch(`${API_BASE_URL}/api/teacher/assignment/${assignmentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setAssignments(assignments.filter(a => a._id !== assignmentId));
                setDeleteModal(null);
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to delete assignment');
            console.error(err);
        }
    };

    const filteredAssignments = assignments.filter(assignment =>
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.course?.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isOverdue = (dueDate) => new Date(dueDate) < new Date();

    if (loading) {
        return <div className="page-container"><p>Loading assignments...</p></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Manage Assignments</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/teacher/assignment/create')}>
                        + Create Assignment
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/teacher/quiz/create')}>
                        + Create Quiz
                    </button>
                </div>
            </div>

            <div className="filters-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search assignments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredAssignments.length === 0 ? (
                <div className="empty-state">
                    <p>No assignments found.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/teacher/assignment/create')}>
                        Create Your First Assignment
                    </button>
                </div>
            ) : (
                <div className="assignments-list">
                    {filteredAssignments.map(assignment => (
                        <div key={assignment._id} className="assignment-card">
                            <div className="assignment-header">
                                <h3>{assignment.title}</h3>
                                <span className={`status-badge ${assignment.status}`}>
                                    {assignment.status}
                                </span>
                            </div>
                            <p className="assignment-description">{assignment.description}</p>
                            <div className="assignment-meta">
                                <span>📚 {assignment.course?.title || 'N/A'}</span>
                                <span className={isOverdue(assignment.dueDate) ? 'overdue' : ''}>
                                    📅 Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                </span>
                                <span>💯 Max Grade: {assignment.maxGrade}</span>
                            </div>
                            <div className="assignment-stats">
                                <div className="stat">
                                    <span className="stat-label">Total Submissions</span>
                                    <span className="stat-value">{assignment.totalSubmissions || 0}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Graded</span>
                                    <span className="stat-value">{assignment.gradedSubmissions || 0}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Pending</span>
                                    <span className="stat-value pending">{assignment.pendingSubmissions || 0}</span>
                                </div>
                            </div>
                            <div className="assignment-actions">
                                <button
                                    className="btn-small btn-primary"
                                    onClick={() => navigate(`/teacher/assignment/${assignment._id}/grade`)}
                                >
                                    Grade Submissions
                                </button>
                                <button
                                    className="btn-small btn-secondary"
                                    onClick={() => navigate(`/teacher/assignment/${assignment._id}/edit`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn-small btn-danger"
                                    onClick={() => setDeleteModal(assignment)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {
                deleteModal && (
                    <div className="modal-overlay" onClick={() => setDeleteModal(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Delete Assignment</h2>
                            <p>Are you sure you want to delete "{deleteModal.title}"?</p>
                            <p className="warning-text">All submissions will be deleted permanently.</p>
                            <div className="modal-actions">
                                <button className="btn btn-secondary" onClick={() => setDeleteModal(null)}>
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(deleteModal._id)}
                                >
                                    Delete Assignment
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default TeacherAssignments;
