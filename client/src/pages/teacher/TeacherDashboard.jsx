import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../../styles/teacher.css';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const TeacherDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            const response = await fetch('http://localhost:5000/api/teacher/analytics', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setAnalytics(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to load analytics');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="dashboard-container"><p>Loading dashboard...</p></div>;
    }

    if (error) {
        return <div className="dashboard-container"><p className="error-message">{error}</p></div>;
    }

    const submissionStatusData = analytics ? [
        { name: 'Graded', value: analytics.submissionStats.graded },
        { name: 'Pending', value: analytics.submissionStats.pending },
        { name: 'Late', value: analytics.submissionStats.late }
    ] : [];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Teacher Dashboard</h1>
                    <p>Welcome back, {user?.firstName} {user?.lastName}!</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/teacher/course/create')}>
                    + Create New Course
                </button>
            </header>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Courses</h3>
                    <p className="stat-value">{analytics?.overview.totalCourses || 0}</p>
                    <p className="stat-context">{analytics?.overview.publishedCourses || 0} Published</p>
                </div>
                <div className="stat-card">
                    <h3>Total Students</h3>
                    <p className="stat-value">{analytics?.overview.totalStudents || 0}</p>
                    <p className="stat-context">Across all courses</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Grades</h3>
                    <p className="stat-value" style={{ color: '#FFBB28' }}>
                        {analytics?.submissionStats.pending || 0}
                    </p>
                    <p className="stat-context">Submissions to review</p>
                </div>
                <div className="stat-card">
                    <h3>Completed</h3>
                    <p className="stat-value">{analytics?.overview.totalCompleted || 0}</p>
                    <p className="stat-context">Course completions</p>
                </div>
            </div>

            <div className="dashboard-quick-actions" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button className="btn btn-primary" onClick={() => navigate('/teacher/courses')}>
                    View All Courses
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/teacher/assignments')}>
                    Manage Assignments
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/teacher/analytics')}>
                    View Analytics
                </button>
            </div>

            {analytics && analytics.courseEnrollment.length > 0 && (
                <div className="dashboard-grid-main" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '30px' }}>
                    <div className="chart-card">
                        <h3>Course Enrollment Overview</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={analytics.courseEnrollment}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="enrolled" fill="#8884d8" radius={[4, 4, 0, 0]} name="Enrolled" />
                                    <Bar dataKey="completed" fill="#00C49F" radius={[4, 4, 0, 0]} name="Completed" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="chart-card">
                        <h3>Grading Status</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={submissionStatusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {submissionStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '14px' }}>
                            {submissionStatusData.map((entry, index) => (
                                <span key={index} style={{ color: COLORS[index] }}>● {entry.name}: {entry.value}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {analytics && analytics.recentEnrollments.length > 0 && (
                <div className="dashboard-content" style={{ marginTop: '30px' }}>
                    <h3>Recent Enrollments</h3>
                    <table className="simple-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-light)' }}>
                                <th style={{ padding: '10px' }}>Student</th>
                                <th>Course</th>
                                <th>Enrolled Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analytics.recentEnrollments.map((enrollment, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '10px' }}>{enrollment.studentName}</td>
                                    <td>{enrollment.courseName}</td>
                                    <td>{new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {(!analytics || analytics.overview.totalCourses === 0) && (
                <div style={{ textAlign: 'center', marginTop: '50px', padding: '40px' }}>
                    <h2>Get Started</h2>
                    <p>You haven't created any courses yet. Create your first course to get started!</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/teacher/course/create')}
                        style={{ marginTop: '20px' }}
                    >
                        Create Your First Course
                    </button>
                </div>
            )}
        </div>
    );
};

export default TeacherDashboard;
<style jsx>
    {`
    .dashboard-content {
        margin-top: 20px;
    }
    .dashboard-grid-main {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 20px;

    }
        .stat-card{
        display:grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        width:30px;
        margin:10px;
        padding:10px;
        border-radius:10px;
        background-color: var(--bg-primary);
        box-shadow:0 2px 4px rgba(0,0,0,0.1);   
        }
        .dashboard-stats{
            display:grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            width:30px;
            margin:10px;
            padding:10px;
            border-radius:10px;
            background-color: var(--bg-primary);
            box-shadow:0 2px 4px rgba(0,0,0,0.1);   
        }     
    `}
</style>
