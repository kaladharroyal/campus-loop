import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/teacher.css';
import API_BASE_URL from '../../config/api';

const CourseStudents = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, completed, inProgress

    useEffect(() => {
        fetchStudents();
    }, [id]);

    const fetchStudents = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            const response = await fetch(`${API_BASE_URL}/api/teacher/course/${id}/students`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setStudents(data.data);
                setCourse(data.course);
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to load students');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Progress (%)', 'Status'];
        const csvData = filteredStudents.map(s => [s.name, s.email, s.progress, s.status]);
        const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${course.title}_students.csv`;
        a.click();
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' ||
            (filterStatus === 'completed' && student.status === 'Completed') ||
            (filterStatus === 'inProgress' && student.status === 'In Progress');
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return <div className="page-container"><p>Loading students...</p></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Enrolled Students</h1>
                    {course && <p className="course-subtitle">{course.title} ({course.enrolledCount} students)</p>}
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/teacher/courses')}>
                    Back to Courses
                </button>
            </div>

            <div className="filters-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('completed')}
                    >
                        Completed
                    </button>
                    <button
                        className={`filter-btn ${filterStatus === 'inProgress' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('inProgress')}
                    >
                        In Progress
                    </button>
                </div>
                <button className="btn btn-primary" onClick={exportToCSV}>
                    Export CSV
                </button>
            </div>

            {filteredStudents.length === 0 ? (
                <div className="empty-state">
                    <p>No students found.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Progress</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <div className="progress-bar-container">
                                            <div
                                                className="progress-bar-fill"
                                                style={{ width: `${student.progress}%` }}
                                            />
                                            <span className="progress-text">{student.progress}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${student.status.replace(' ', '-').toLowerCase()}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CourseStudents;
