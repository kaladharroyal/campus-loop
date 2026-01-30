import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import '../../styles/admin.css'

/**
 * ManageAssignments component
 * Admin assignment oversight and tracking
 */
const ManageAssignments = () => {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const response = await fetch('/api/assignments', {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch assignments');

            const data = await response.json();
            setAssignments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getSubmissionStats = (assignment) => {
        // This would need to be enhanced with actual submission data
        return {
            total: assignment.submissions?.length || 0,
            graded: assignment.submissions?.filter(s => s.graded)?.length || 0,
            pending: assignment.submissions?.filter(s => !s.graded)?.length || 0
        };
    };

    const filteredAssignments = filterStatus
        ? assignments.filter(a => {
            const dueDate = new Date(a.dueDate);
            const now = new Date();
            if (filterStatus === 'active') return dueDate > now;
            if (filterStatus === 'overdue') return dueDate < now;
            return true;
        })
        : assignments;

    if (loading) return <div className="loading">Loading assignments...</div>;

    return (
        <div className="manage-assignments">
            <div className="page-header">
                <div>
                    <h1>Manage Assignments</h1>
                    <p>Track all assignments and submissions across courses</p>
                </div>
            </div>

            {error && (
                <div className="alert alert-error">
                    <span>⚠️</span> {error}
                </div>
            )}

            {/* Filter Controls */}
            <div className="filter-section">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-select"
                >
                    <option disabled>-- select filter --</option>
                    <option value="">All Assignments</option>
                    <option value="active">Active</option>
                    <option value="overdue">Overdue</option>
                </select>
            </div>

            {/* Assignments Table */}
            {filteredAssignments.length > 0 ? (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Course</th>
                                <th>Due Date</th>
                                <th>Total Points</th>
                                <th>Submissions</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssignments.map((assignment) => {
                                const stats = getSubmissionStats(assignment);
                                const dueDate = new Date(assignment.dueDate);
                                const isOverdue = dueDate < new Date();

                                return (
                                    <tr key={assignment._id}>
                                        <td>{assignment.title}</td>
                                        <td>{assignment.course?.title || 'N/A'}</td>
                                        <td>
                                            <span className={isOverdue ? 'text-danger' : ''}>
                                                {dueDate.toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td>{assignment.totalPoints || 'N/A'}</td>
                                        <td>
                                            <div className="submission-stats">
                                                <span>Total: {stats.total}</span>
                                                <span className="text-success">Graded: {stats.graded}</span>
                                                <span className="text-warning">Pending: {stats.pending}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${isOverdue ? 'overdue' : 'active'}`}>
                                                {isOverdue ? 'Overdue' : 'Active'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-data">
                    <p>No assignments found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default ManageAssignments;