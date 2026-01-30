import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../../styles/pages.css';

const dataSubmissions = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 19 },
    { name: 'Wed', count: 15 },
    { name: 'Thu', count: 22 },
    { name: 'Fri', count: 30 },
];

const dataStatus = [
    { name: 'Graded', value: 45 },
    { name: 'Pending', value: 15 },
    { name: 'Late', value: 5 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const FacultyDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Faculty Dashboard</h1>
                    <p>Welcome back, teacher {user?.lastName}!</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/teacher/courses')}>
                    + Create New Course
                </button>
            </header>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Active Courses</h3>
                    <p className="stat-value">3</p>
                    <p className="stat-context">Ongoing semesters</p>
                </div>
                <div className="stat-card">
                    <h3>Total Students</h3>
                    <p className="stat-value">128</p>
                    <p className="stat-context">Across all courses</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Grades</h3>
                    <p className="stat-value" style={{ color: '#FFBB28' }}>15</p>
                    <p className="stat-context">Assignments to review</p>
                </div>
                <div className="stat-card">
                    <h3>Avg Rating</h3>
                    <p className="stat-value">4.8</p>
                    <p className="stat-context">Student feedback</p>
                </div>
            </div>

            <div className="dashboard-grid-main" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
                <div className="chart-card">
                    <h3>Weekly Assignment Submissions</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={dataSubmissions}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
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
                                    data={dataStatus}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dataStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '14px' }}>
                        {dataStatus.map((entry, index) => (
                            <span key={index} style={{ color: COLORS[index] }}>● {entry.name}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="dashboard-content" style={{ marginTop: '30px' }}>
                <h3>Recent Submissions</h3>
                <table className="simple-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '10px' }}>Student</th>
                            <th>Assignment</th>
                            <th>Course</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #f9f9f9' }}>
                            <td style={{ padding: '10px' }}>John Doe</td>
                            <td>React Project</td>
                            <td>MERN Stack</td>
                            <td>Oct 24, 2023</td>
                            <td><span style={{ color: 'orange' }}>Pending</span></td>
                            <td><button className="btn-small">Grade</button></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f9f9f9' }}>
                            <td style={{ padding: '10px' }}>Jane Smith</td>
                            <td>Java OOP</td>
                            <td>Java Masterclass</td>
                            <td>Oct 23, 2023</td>
                            <td><span style={{ color: 'green' }}>Graded</span></td>
                            <td><button className="btn-small">View</button></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f9f9f9' }}>
                            <td style={{ padding: '10px' }}>Alice Johnson</td>
                            <td>Database Design</td>
                            <td>DBMS</td>
                            <td>Oct 22, 2023</td>
                            <td><span style={{ color: 'green' }}>Graded</span></td>
                            <td><button className="btn-small">View</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FacultyDashboard;
