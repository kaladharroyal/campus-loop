import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const Login = () => {
  const [role, setRole] = useState('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [label, setLabel] = useState('Roll No.');
  const [placeholder, setPlaceholder] = useState('e.g., CSE001');

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'student') {
      setLabel('Roll Number');
      setPlaceholder('e.g., CSE001');
    } else if (role === 'teacher') {
      setLabel('Email Address');
      setPlaceholder('faculty@university.edu');
    } else if (role === 'admin') {
      setLabel('Username');
      setPlaceholder('admin_username');
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData = await login(identifier, password, role);

      // Role-based navigation
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (userData.role === 'instructor') { // Assuming 'teacher' role from UI maps to 'instructor' in backend
        navigate('/teacher/dashboard');
      } else { // Default for student or other roles
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (roleType) => {
    switch (roleType) {
      case 'student': return '🎓';
      case 'teacher': return '👨‍🏫';
      case 'admin': return '⚙️';
      default: return '🎓';
    }
  };

  const getRoleDescription = () => {
    switch (role) {
      case 'student': return 'Access your courses, assignments, and grades';
      case 'teacher': return 'Manage courses, students, and assessments';
      case 'admin': return 'System administration and management';
      default: return '';
    }
  };

  return (
    <div className="auth-page">
      {/* Background Elements */}
      <div className="auth-background">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* Main Container */}
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-brand-section">
          <div className="brand-content">
            <div className="brand-logo">
              <div className="logo-circle">
                <span className="logo-icon">📚</span>
              </div>
              <h1 className="brand-name">Campus Loop</h1>
            </div>

            <div className="brand-tagline">
              <h2>Welcome Back to Learning</h2>
              <p>Sign in to access your personalized learning dashboard, track progress, and connect with your academic community.</p>
            </div>

            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Real-time Progress Tracking</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Interactive Course Materials</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Collaborative Learning Tools</span>
              </div>
            </div>

            <div className="brand-stats">
              <div className="stat-box">
                <div className="stat-value">5K+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">150+</div>
                <div className="stat-label">Courses</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="auth-form-section">
          <div className="form-wrapper">
            <div className="form-header">
              <h2 className="form-title">Sign In</h2>
              <p className="form-subtitle">Choose your role and enter credentials</p>
            </div>

            {/* Role Selector */}
            <div className="role-selector">
              {['student', 'teacher', 'admin'].map((roleType) => (
                <button
                  key={roleType}
                  type="button"
                  className={`role-btn ${role === roleType ? 'active' : ''}`}
                  onClick={() => setRole(roleType)}
                >
                  <span className="role-icon">{getRoleIcon(roleType)}</span>
                  <span className="role-name">{roleType.charAt(0).toUpperCase() + roleType.slice(1)}</span>
                </button>
              ))}
            </div>

            <div className="role-description">
              {getRoleDescription()}
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label htmlFor="identifier" className="input-label">
                  {label}
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="identifier"
                    className="form-input"
                    placeholder={placeholder}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  <span className="error-text">{error}</span>
                </div>
              )}

              <button
                type="submit"
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="form-footer">
              <p className="footer-text">
                Don't have an account?{' '}
                <Link to="/register" className="footer-link">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;