import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config/api';

/**
 * ReportsAndAnalytics component
 * Admin analytics and reporting dashboard
 */
const ReportsAndAnalytics = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Report configuration
    const reports = [
        {
            id: 'student-performance',
            endpoint: `${API_BASE_URL}/api/reports/student-performance`,
            icon: '📋',
            title: 'Student Performance Report',
            description: 'Detailed analysis of student grades and progress'
        },
        {
            id: 'course-analytics',
            endpoint: `${API_BASE_URL}/api/reports/course-analytics`,
            icon: '📊',
            title: 'Course Analytics',
            description: 'Enrollment trends and course effectiveness metrics'
        },
        {
            id: 'attendance-analytics',
            endpoint: `${API_BASE_URL}/api/reports/attendance-analytics`,
            icon: '📈',
            title: 'Attendance Analytics',
            description: 'Student and class attendance patterns'
        },
        {
            id: 'assignment-analytics',
            endpoint: `${API_BASE_URL}/api/reports/assignment-analytics`,
            icon: '🎯',
            title: 'Assignment Analytics',
            description: 'Submission rates and grading statistics'
        },
        {
            id: 'teacher-workload',
            endpoint: `${API_BASE_URL}/api/reports/teacher-workload`,
            icon: '👨‍🏫',
            title: 'Faculty Workload',
            description: 'Course load and teaching assignments overview'
        },
        {
            id: 'monthly-summary',
            endpoint: `${API_BASE_URL}/api/reports/monthly-summary`,
            icon: '📅',
            title: 'Monthly Summary',
            description: 'Comprehensive monthly performance summary'
        }
    ];

    /**
     * Generate and download report
     */
    const generateReport = async (report) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(report.endpoint, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to generate report');
            }

            const data = await response.json();

            // Download as CSV
            if (data.data && Array.isArray(data.data)) {
                downloadCSV(data.data, `${report.id}-${Date.now()}.csv`);
                alert(`${report.title} generated successfully! Check your downloads folder.`);
            } else {
                // For reports without array data, convert to single-row CSV
                const csvData = [data.data || data];
                downloadCSV(csvData, `${report.id}-${Date.now()}.csv`);
                alert(`${report.title} generated successfully! Check your downloads folder.`);
            }
        } catch (err) {
            setError(err.message);
            alert('Error generating report: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Download data as JSON file
     */
    const downloadJSON = (data, filename) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    /**
     * Download data as CSV file
     */
    const downloadCSV = (data, filename) => {
        if (!data || data.length === 0) return;

        // Get headers from first object
        const headers = Object.keys(data[0]);

        // Create CSV content
        let csv = headers.join(',') + '\n';

        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                // Handle values with commas or quotes
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            });
            csv += values.join(',') + '\n';
        });

        // Create and download blob
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="reports-analytics">
            <div className="page-header">
                <h1>Analytics & Insights</h1>
                <p>Comprehensive performance metrics and institutional analytics</p>
            </div>

            {error && (
                <div className="alert alert-error">
                    <span>⚠️</span> {error}
                </div>
            )}

            {/* Analytics Cards */}
            <div className="analytics-grid">
                <div className="analytics-card">
                    <h3>📊 Student Performance</h3>
                    <p className="metric-value">85%</p>
                    <p className="metric-label">Average Success Rate</p>
                    <div className="metric-trend positive">↑ 5% from last month</div>
                </div>

                <div className="analytics-card">
                    <h3>📚 Course Completion</h3>
                    <p className="metric-value">78%</p>
                    <p className="metric-label">Overall Completion Rate</p>
                    <div className="metric-trend positive">↑ 3% from last month</div>
                </div>

                <div className="analytics-card">
                    <h3>📝 Assignment Submission</h3>
                    <p className="metric-value">92%</p>
                    <p className="metric-label">On-Time Submissions</p>
                    <div className="metric-trend negative">↓ 2% from last month</div>
                </div>

                <div className="analytics-card">
                    <h3>👥 Attendance Rate</h3>
                    <p className="metric-value">88%</p>
                    <p className="metric-label">Average Attendance</p>
                    <div className="metric-trend positive">↑ 1% from last month</div>
                </div>
            </div>

            {/* Reports Section */}
            <div className="reports-section">
                <h2>Available Reports</h2>
                <div className="reports-grid">
                    {reports.map((report) => (
                        <div key={report.id} className="report-card">
                            <div className="report-icon">{report.icon}</div>
                            <h3>{report.title}</h3>
                            <p>{report.description}</p>
                            <button
                                onClick={() => generateReport(report)}
                                className="btn-secondary"
                                disabled={loading}
                            >
                                {loading ? 'Generating...' : 'Generate Report'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart Placeholder */}
            <div className="charts-section">
                <h2>Performance Trends</h2>
                <div className="chart-placeholder">
                    <p>📊 Chart visualization would go here</p>
                    <p className="chart-note">Integration with charting library (e.g., Chart.js, Recharts) recommended</p>
                </div>
            </div>
        </div>
    );
};

export default ReportsAndAnalytics;