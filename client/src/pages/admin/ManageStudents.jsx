import React, { useState, useEffect } from 'react';
import '../../styles/admin.css';

/**
 * ManageStudents Component
 * Student management page with CRUD operations
 */
const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        branch: '',
        year: '',
        status: ''
    });

    useEffect(() => {
        fetchStudents();
    }, [filters]);

    const fetchStudents = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const queryParams = new URLSearchParams(filters).toString();

            const response = await fetch(`/api/admin/students?${queryParams}`, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setStudents(data.students);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const toggleStatus = async (studentId) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`/api/admin/user/${studentId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                fetchStudents(); // Refresh list
            }
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const deleteStudent = async (studentId) => {
        if (!window.confirm('Are you sure you want to delete this student?')) {
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`/api/admin/user/${studentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });

            if (response.ok) {
                fetchStudents(); // Refresh list
                alert('Student deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading students...</div>;
    }

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manage Students</h1>
                <p>View, edit, and manage all student accounts</p>
            </div>

            {/* Filters */}
            <div className="admin-filters">
                <input
                    type="text"
                    name="search"
                    placeholder="Search by name or email..."
                    value={filters.search}
                    onChange={handleFilterChange}
                    className="admin-filter-input"
                />

                <input
                    type="text"
                    name="branch"
                    placeholder="Branch"
                    value={filters.branch}
                    onChange={handleFilterChange}
                    className="admin-filter-input"
                />

                <input
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={filters.year}
                    onChange={handleFilterChange}
                    className="admin-filter-input"
                />

                <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="admin-filter-select"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Student Count */}
            <div className="admin-count">
                Total Students: <strong>{students.length}</strong>
            </div>

            {/* Students Table */}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Branch</th>
                            <th>Year</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.firstName} {student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.branch || 'N/A'}</td>
                                    <td>{student.year || 'N/A'}</td>
                                    <td>{student.phone || 'N/A'}</td>
                                    <td>
                                        <span className={`status-badge ${student.status}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="admin-actions">
                                        <button
                                            onClick={() => toggleStatus(student._id)}
                                            className="admin-btn admin-btn-sm admin-btn-warning"
                                            title={student.status === 'active' ? 'Deactivate' : 'Activate'}
                                        >
                                            {student.status === 'active' ? '🔒' : '✓'}
                                        </button>
                                        <button
                                            onClick={() => deleteStudent(student._id)}
                                            className="admin-btn admin-btn-sm admin-btn-danger"
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageStudents;
