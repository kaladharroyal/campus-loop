import React, { useState, useEffect } from 'react';
import '../../styles/admin.css';

/**
 * ManageAssignments Component
 * Assignment management and tracking page
 */
const ManageAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const response = await fetch('/api/assignments');
            if (response.ok) {
                const data = await response.json();
                setAssignments(data);
            }
        } catch (error) {
            console.error('Error fetching assignments:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading assignments...</div>;
    }

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manage Assignments</h1>
                <p>Track all assignments and submissions</p>
            </div>

            <div className="admin-count">
                Total Assignments: <strong>{assignments.length}</strong>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Assignment Title</th>
                            <th>Course</th>
                            <th>Due Date</th>
                            <th>Submissions</th>
                            <th>Graded</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length > 0 ? (
                            assignments.map((assignment) => {
                                const totalSubmissions = assignment.submissions?.length || 0;
                                const gradedSubmissions = assignment.submissions?.filter(
                                    s => s.grade
                                ).length || 0;

                                return (
                                    <tr key={assignment._id}>
                                        <td>{assignment.title}</td>
                                        <td>{assignment.course?.title || 'N/A'}</td>
                                        <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                                        <td>{totalSubmissions}</td>
                                        <td>{gradedSubmissions}/{totalSubmissions}</td>
                                        <td className="admin-actions">
                                            <button className="admin-btn admin-btn-sm admin-btn-info">
                                                👁️ View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>
                                    No assignments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAssignments;
