import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/teacher.css';

const GradeAssignment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gradingModal, setGradingModal] = useState(null);
    const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchAssignment();
    }, [id]);

    const fetchAssignment = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            const response = await fetch(`http://localhost:5000/api/teacher/assignment/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setAssignment(data.data.assignment);
                setSubmissions(data.data.submissions);
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to load assignment');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openGradingModal = (submission) => {
        setGradingModal(submission);
        setGradeData({
            grade: submission.grade || '',
            feedback: submission.feedback || ''
        });
    };

    const handleGradeSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/teacher/assignment/submission/${gradingModal._id}/grade`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(gradeData)
            });

            const data = await response.json();
            if (data.success) {
                // Update local state
                setSubmissions(submissions.map(s =>
                    s._id === gradingModal._id
                        ? { ...s, grade: gradeData.grade, feedback: gradeData.feedback, status: 'graded' }
                        : s
                ));
                setGradingModal(null);
                alert('Grade submitted successfully!');
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to submit grade');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="page-container"><p>Loading assignment...</p></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Grade Submissions</h1>
                    {assignment && <p className="course-subtitle">{assignment.title}</p>}
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/teacher/assignments')}>
                    Back to Assignments
                </button>
            </div>

            {assignment && (
                <div className="info-section">
                    <p><strong>Course:</strong> {assignment.course?.title}</p>
                    <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleString()}</p>
                    <p><strong>Max Grade:</strong> {assignment.maxGrade}</p>
                    <p><strong>Total Submissions:</strong> {submissions.length}</p>
                </div>
            )}

            {submissions.length === 0 ? (
                <div className="empty-state">
                    <p>No submissions yet.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Submitted At</th>
                                <th>Status</th>
                                <th>Grade</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map(submission => (
                                <tr key={submission._id}>
                                    <td>{submission.student?.firstName} {submission.student?.lastName}</td>
                                    <td>{new Date(submission.submittedAt).toLocaleString()}</td>
                                    <td>
                                        <span className={`status-badge ${submission.status}`}>
                                            {submission.status}
                                        </span>
                                    </td>
                                    <td>{submission.grade || '-'}</td>
                                    <td>
                                        <button
                                            className="btn-small btn-primary"
                                            onClick={() => openGradingModal(submission)}
                                        >
                                            {submission.status === 'graded' ? 'Edit Grade' : 'Grade'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Grading Modal */}
            {gradingModal && (
                <div className="modal-overlay" onClick={() => setGradingModal(null)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <h2>Grade Submission</h2>
                        <p><strong>Student:</strong> {gradingModal.student?.firstName} {gradingModal.student?.lastName}</p>

                        <div className="submission-details">
                            <h3>Submission</h3>
                            {gradingModal.submissionText && (
                                <div className="submission-text">
                                    <p>{gradingModal.submissionText}</p>
                                </div>
                            )}
                            {gradingModal.attachments && gradingModal.attachments.length > 0 && (
                                <div className="attachments">
                                    <h4>Attachments:</h4>
                                    {gradingModal.attachments.map((att, idx) => (
                                        <a key={idx} href={att.url} target="_blank" rel="noopener noreferrer">
                                            {att.filename}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleGradeSubmit}>
                            <div className="form-group">
                                <label>Grade (out of {assignment.maxGrade}) *</label>
                                <input
                                    type="text"
                                    value={gradeData.grade}
                                    onChange={(e) => setGradeData({ ...gradeData, grade: e.target.value })}
                                    placeholder="e.g., 85 or A"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Feedback</label>
                                <textarea
                                    value={gradeData.feedback}
                                    onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                                    rows="5"
                                    placeholder="Provide feedback to the student..."
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setGradingModal(null)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving ? 'Saving...' : 'Submit Grade'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GradeAssignment;
