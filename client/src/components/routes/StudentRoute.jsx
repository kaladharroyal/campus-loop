import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user && user.role === 'student') {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default StudentRoute;
