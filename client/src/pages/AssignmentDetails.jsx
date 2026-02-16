import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/pages.css';
import API_BASE_URL from '../config/api';

const AssignmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [submissionText, setSubmissionText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [existingSubmission, setExistingSubmission] = useState(null);

    useEffect(() => {
        fetchAssignmentDetails();
    }, [id]);

    const fetchAssignmentDetails = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;

            // Fetch Assignment
            const assignResponse = await fetch(`${API_BASE_URL}/api/assignments/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const assignData = await assignResponse.json();

            if (assignResponse.ok) {
                setAssignment(assignData);
            } else {
                alert('Failed to load assignment details');
                navigate('/assignments');
                return;
            }

            // Check for existing submission
            const subResponse = await fetch(`${API_BASE_URL}/api/assignments/${id}/submission`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (subResponse.ok) {
                const subData = await subResponse.json();
                setExistingSubmission(subData);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file && !submissionText) {
            alert('Please upload a file or add a comment.');
            return;
        }

        setSubmitting(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;

            const formData = new FormData();
            if (file) formData.append('file', file);
            formData.append('submissionText', submissionText);

            const response = await fetch(`${API_BASE_URL}/api/assignments/${id}/submit`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Content-Type is auto-set by FormData
                },
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                alert('Assignment submitted successfully!');
                navigate('/assignments');
            } else {
                alert(data.message || 'Submission failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting assignment');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="page-container">Loading details...</div>;
    if (!assignment) return <div className="page-container">Assignment not found</div>;

    const isOverdue = new Date(assignment.dueDate) < new Date();

    return (
        <div className="page-container">
            <div className="assignment-details-card">
                <div className="details-header">
                    <div>
                        <span className={`type-badge ${assignment.type}`}>{assignment.type}</span>
                        <h1>{assignment.title}</h1>
                        <p className="course-name">{assignment.course?.title || 'General Course'}</p>
                    </div>
                    <div className="due-date-box">
                        <span className="label">Due Date</span>
                        <span className={`date ${isOverdue ? 'overdue' : ''}`}>
                            {new Date(assignment.dueDate).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="details-content">
                    <h3>Instructions</h3>
                    <div className="description-box">
                        {assignment.description}
                    </div>

                    <div className="submission-section">
                        <h3>Your Submission</h3>
                        {/* If we had existingSubmission state, we could show it here. 
                            For now, assuming new submission.
                        */}

                        {existingSubmission ? (
                            <div className="submission-status-card">
                                <div className="status-header">
                                    <span className="status-badge submitted">Submitted</span>
                                    <span className="submission-date">
                                        {new Date(existingSubmission.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <div className="submission-body">
                                    <p><strong>Comments:</strong> {existingSubmission.submissionText || 'No comments'}</p>
                                    {existingSubmission.attachments && existingSubmission.attachments.length > 0 && (
                                        <div className="attachments-list">
                                            <p><strong>Attachments:</strong></p>
                                            {existingSubmission.attachments.map((file, index) => (
                                                <div key={index} className="attachment-item">
                                                    {file.filename.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                                        <div className="image-preview">
                                                            <img
                                                                src={`${API_BASE_URL}${file.url}`}
                                                                alt="Submission attachment"
                                                                style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px', borderRadius: '4px' }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <a
                                                            href={`${API_BASE_URL}${file.url}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="attachment-link"
                                                        >
                                                            View File ({file.filename})
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {existingSubmission.grade && (
                                        <div className="grade-box">
                                            <p><strong>Grade:</strong> {existingSubmission.grade}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Upload File (PDF, Image)</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        className="file-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Comments (Optional)</label>
                                    <textarea
                                        rows="3"
                                        value={submissionText}
                                        onChange={(e) => setSubmissionText(e.target.value)}
                                        placeholder="Add any comments for the teacher..."
                                    />
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/assignments')}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submitting || isOverdue}
                                    >
                                        {submitting ? 'Submitting...' : 'Submit Assignment'}
                                    </button>
                                </div>
                                {isOverdue && <p className="error-text">This assignment is overdue.</p>}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentDetails;
