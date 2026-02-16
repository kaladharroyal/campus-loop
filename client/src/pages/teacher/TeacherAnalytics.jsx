import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import '../../styles/teacher.css';
import API_BASE_URL from '../../config/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const TeacherAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;
            const response = await fetch(`${API_BASE_URL}/api/teacher/analytics`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setAnalytics(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="page-container"><p>Loading analytics...</p></div>;
    }

    if (!analytics) {
        return <div className="page-container"><p>No analytics data available.</p></div>;
    }

    const enrollmentCompletionData = analytics.courseEnrollment.map(course => ({
        name: course.name,
        enrolled: course.enrolled,
        completed: course.completed,
        completionRate: course.enrolled > 0 ? ((course.completed / course.enrolled) * 100).toFixed(1) : 0
    }));

    const submissionStatusData = [
        { name: 'Graded', value: analytics.submissionStats.graded },
        { name: 'Pending', value: analytics.submissionStats.pending },
        { name: 'Late', value: analytics.submissionStats.late }
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Analytics & Insights</h1>
            </div>

            <div className="analytics-overview">
                <div className="stat-card">
                    <h3>Total Courses</h3>
                    <p className="stat-value">{analytics.overview.totalCourses}</p>
                    <p className="stat-detail">
                        {analytics.overview.publishedCourses} Published · {analytics.overview.draftCourses} Drafts
                    </p>
                </div>
                <div className="stat-card">
                    <h3>Total Students</h3>
                    <p className="stat-value">{analytics.overview.totalStudents}</p>
                    <p className="stat-detail">Unique enrollments</p>
                </div>
                <div className="stat-card">
                    <h3>Completions</h3>
                    <p className="stat-value">{analytics.overview.totalCompleted}</p>
                    <p className="stat-detail">Course completions</p>
                </div>
                <div className="stat-card">
                    <h3>Assignments</h3>
                    <p className="stat-value">{analytics.overview.totalAssignments}</p>
                    <p className="stat-detail">{analytics.submissionStats.total} submissions</p>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Course-wise Enrollment & Completion</h3>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart data={enrollmentCompletionData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="enrolled" fill="#8884d8" name="Enrolled" />
                                <Bar dataKey="completed" fill="#00C49F" name="Completed" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-card">
                    <h3>Assignment Submission Status</h3>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={submissionStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={100}
                                    fill="#8884d8"
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
                </div>

                <div className="chart-card full-width">
                    <h3>Completion Rate by Course</h3>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <LineChart data={enrollmentCompletionData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="completionRate"
                                    stroke="#8884d8"
                                    name="Completion Rate (%)"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {analytics.recentEnrollments.length > 0 && (
                <div className="recent-activity">
                    <h3>Recent Enrollments</h3>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Course</th>
                                    <th>Enrolled Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.recentEnrollments.map((enrollment, index) => (
                                    <tr key={index}>
                                        <td>{enrollment.studentName}</td>
                                        <td>{enrollment.courseName}</td>
                                        <td>{new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherAnalytics;
