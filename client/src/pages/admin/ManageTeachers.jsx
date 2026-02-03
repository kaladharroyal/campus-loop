import React, { useState, useEffect } from 'react';
import '../../styles/admin.css';
import API_BASE_URL from '../../config/api';

/**
 * ManageTeachers Component
 * Teacher management page with CRUD operations
 */
const ManageTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        branch: ''
    });

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`${API_BASE_URL}/api/admin/teachers`, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched teachers:', data); // Debug log
                if (data.teachers && Array.isArray(data.teachers)) {
                    setTeachers(data.teachers);
                } else {
                    console.error('Invalid teacher data format:', data);
                    setTeachers([]);
                }
            } else {
                console.error('Failed to fetch teachers:', response.status);
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`${API_BASE_URL}/api/admin/create-teacher`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Teacher created successfully');
                setShowAddForm(false);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    phone: '',
                    branch: ''
                });
                fetchTeachers();
            } else {
                const data = await response.json();
                alert(data.message || 'Error creating teacher');
            }
        } catch (error) {
            console.error('Error creating teacher:', error);
            alert('Error creating teacher');
        }
    };

    const deleteTeacher = async (teacherId) => {
        if (!window.confirm('Are you sure you want to delete this teacher?')) {
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`${API_BASE_URL}/api/admin/user/${teacherId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });

            if (response.ok) {
                fetchTeachers();
                alert('Teacher deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading teachers...</div>;
    }

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manage Teachers</h1>
                <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? '✕ Cancel' : '➕ Add Teacher'}
                </button>
            </div>

            {/* Add Teacher Form */}
            {showAddForm && (
                <div className="admin-form-card">
                    <h3>Add New Teacher</h3>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-row">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                className="admin-input"
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                className="admin-input"
                            />
                        </div>
                        <div className="form-row">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="admin-input"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="admin-input"
                            />
                        </div>
                        <div className="form-row">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="admin-input"
                            />
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleInputChange}
                                className="admin-input"
                            >
                                <option value="">Select Department/Branch</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Finance">Finance</option>
                                <option value="IT Support">IT Support</option>
                            </select>
                        </div>
                        <button type="submit" className="admin-btn admin-btn-success">
                            Create Teacher
                        </button>
                    </form>
                </div>
            )}

            {/* Teachers Table */}
            <div className="admin-count">
                Total Teachers: <strong>{teachers.length}</strong>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Phone</th>
                            <th>Courses Assigned</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.length > 0 ? (
                            teachers.map((teacher) => (
                                <tr key={teacher._id}>
                                    <td>{teacher.firstName} {teacher.lastName}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.branch || 'N/A'}</td>
                                    <td>{teacher.phone || 'N/A'}</td>
                                    <td>{teacher.courseCount || 0}</td>
                                    <td>
                                        <span className={`status-badge ${teacher.status}`}>
                                            {teacher.status}
                                        </span>
                                    </td>
                                    <td className="admin-actions">
                                        <button
                                            onClick={() => deleteTeacher(teacher._id)}
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
                                    No teachers found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTeachers;
