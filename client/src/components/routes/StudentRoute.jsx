import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * StudentRoute component
 * Protects student-only routes
 * Redirects to appropriate dashboard if user is not a student
 */
const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div>Loading...</div>
            </div>
        );
    }

    // Not authenticated - redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Not a student - redirect to appropriate dashboard
    if (user.role !== 'student') {
        if (user.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        }
        if (user.role === 'instructor') {
            return <Navigate to="/teacher/dashboard" replace />;
        }
    }

    // User is student - allow access
    return children;
};

export default StudentRoute;