import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    // Navigate user to appropriate dashboard based on role
    const navigateBasedOnRole = (userData) => {
        if (userData.role === 'admin') {
            navigate('/admin/dashboard');
        } else if (userData.role === 'teacher') {
            navigate('/teacher/dashboard');
        } else {
            navigate('/dashboard'); // student
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);

            // Navigate based on user role
            navigateBasedOnRole(data);

            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (firstName, lastName, email, password, role, branch, year, phone, rollno) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password, role, branch, year, phone, rollno }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);

            // Navigate based on user role
            navigateBasedOnRole(data);

            return data;
        } catch (error) {
            throw error;
        }
    };

    const updateProfile = async (userData) => {
        try {
            const token = user?.token || JSON.parse(localStorage.getItem('userInfo'))?.token;

            const response = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Profile update failed');
            }

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, updateProfile, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
