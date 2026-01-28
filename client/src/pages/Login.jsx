import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';
import loginImg from '../assets/campus-loop-logo.png';

const Login = () => {
  const [role, setRole] = useState('student');
  const [identifier, setIdentifier] = useState(''); // email, username, or roll no
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [label, setLabel] = useState('Roll No.');
  const [placeholder, setPlaceholder] = useState('e.g., cse1');

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'student') {
      setLabel('Roll No.');
      setPlaceholder('e.g., cse1');
    } else if (role === 'teacher') {
      setLabel('Email');
      setPlaceholder('e.g., faculty@example.com');
    } else if (role === 'admin') {
      setLabel('Username');
      setPlaceholder('e.g., admin');
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(identifier, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="login-container">
        <div className="form-section">
          <div className="header">
            <h1>Campus Loop</h1>
            <p>Login to your account as a Student, Faculty, or Admin.</p>
          </div>

          <div className="tab-buttons">
            <button
              type="button"
              className={`tab-button ${role === 'student' ? 'active' : ''}`}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button
              type="button"
              className={`tab-button ${role === 'teacher' ? 'active' : ''}`}
              onClick={() => setRole('teacher')}
            >
              Faculty
            </button>
            <button
              type="button"
              className={`tab-button ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="identifier">{label}</label>
              <input
                type="text"
                id="identifier"
                placeholder={placeholder}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}

            <button type="submit" className="btn-primary">Login</button>

            <div className="mt-4">
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Don't have an account? <Link to="/register" className="text-link">Register</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="image-section">
          <img src={loginImg} alt="Library" />
        </div>
      </div>
    </div>
  );
};

export default Login;
