import React, { useState, useEffect } from 'react';
import '../../styles/admin.css';

/**
 * ManageStudents Component
 * Student management page with CRUD operations
 */
const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContainer, setShowContainer] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [branch, setBranch] = useState("");
    const [roll, setRoll] = useState("");
    const [address, setAddress] = useState("");
    const [year, setYear] = useState("");
    const [phone, setPhone] = useState("0000000000");
    const [filters, setFilters] = useState({
        search: '',
        branch: '',
        year: '',
        status: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce search term
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({ ...prev, search: searchTerm }));
        },);

        return () => clearTimeout(timer);
    }, [searchTerm]);

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
        if (e.target.name === 'search') {
            setSearchTerm(e.target.value);
        } else {
            setFilters({
                ...filters,
                [e.target.name]: e.target.value
            });
        }
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

    const handleAddStudent = async () => {
        // Validation
        if (!name || !email || !password) {
            alert("Please fill in all required fields (Name, Email, Password)");
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));

            // Split name into firstName and lastName
            const nameParts = name.trim().split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

            const studentData = {
                firstName,
                lastName, // If no last name, it will be empty string, but schema requires it.
                email,
                password,
                branch,
                year,
                phone,
                roll,
                address
            };

            // If lastName is empty, we might want to handle it (e.g. use "." or duplicate firstName) 
            // but for now let's hope user enters full name.
            if (!lastName) {
                studentData.lastName = "."; // Fallback to satisfy required constraint if needed
            }

            const response = await fetch('/api/admin/create-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify(studentData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Student added successfully");
                setShowContainer(false);
                // Reset form
                setName("");
                setEmail("");
                setBranch("");
                setYear("");
                setRoll("");
                setPhone("");
                setAddress("");
                setPassword("");
                fetchStudents(); // Refresh list
            } else {
                alert(data.message || "Failed to add student");
            }
        } catch (error) {
            console.error("Error adding student:", error);
            alert("Error adding student");
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading students...</div>;
    }

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manage Students</h1>
                <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => setShowContainer(true)}
                >
                    Add Student
                </button>
                {showContainer && (
                    <div style={styles.overlay}>
                        <div style={styles.container}>
                            <div style={styles.header}>
                                <h3 style={styles.title}>Add New Student</h3>
                                <button
                                    onClick={() => setShowContainer(false)}
                                    style={styles.closeBtn}
                                    title="Close"
                                >
                                    &times;
                                </button>
                            </div>
                            <div style={styles.form}>
                                <div className="form-group">
                                    <label style={styles.label} htmlFor="name">Name *</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter student name"
                                        className="admin-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={styles.label} htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter student email"
                                        className="admin-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={styles.label} htmlFor="branch">Branch *</label>
                                    <input
                                        type="text"
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                        placeholder="Enter student branch"
                                        className="admin-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={styles.label} htmlFor="year">Year *</label>
                                    <input
                                        type="text"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        placeholder="Enter student year"
                                        className="admin-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={styles.label} htmlFor="password">Password *</label>
                                    <input
                                        type="text"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Initial password"
                                        className="admin-input"
                                    />
                                </div>
                            </div>

                            <div style={styles.footer}>
                                <button
                                    onClick={() => setShowContainer(false)}
                                    className="admin-btn admin-btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddStudent}
                                    className="admin-btn admin-btn-primary"
                                >
                                    Add Student
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Filters */}
            <div className="admin-filters">
                <input
                    type="text"
                    name="search"
                    placeholder="Search by name or email..."
                    value={searchTerm}
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

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    container: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        width: '500px',
        maxWidth: '95%',
        maxHeight: '90vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '15px'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        fontWeight: '600',
        color: '#1a1a1a'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        fontSize: '28px',
        lineHeight: '1',
        cursor: 'pointer',
        color: '#666',
        padding: '0 5px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#4a5568',
        marginBottom: '5px',
        display: 'block'
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '20px',
        borderTop: '1px solid #eee',
        paddingTop: '20px'
    }
};
