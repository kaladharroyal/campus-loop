import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
      } else if (userData.role === 'instructor') {
        navigate('/teacher/dashboard');
      } else {
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
    <>
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

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafbff;
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Background */
        .auth-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }

        .gradient-sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          animation: float 20s ease-in-out infinite;
        }

        .sphere-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%);
          top: -200px;
          right: -100px;
        }

        .sphere-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%);
          bottom: -150px;
          left: -100px;
          animation-delay: 5s;
        }

        .sphere-3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-50px, 50px) scale(0.9);
          }
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.3;
        }

        /* Container */
        .auth-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1300px;
          min-width: 900px;
          margin: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: white;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Brand Section */
        .auth-brand-section {
          background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
          padding: 80px 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          min-height: 100%;
        }

        .auth-brand-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .brand-content {
          position: relative;
          z-index: 1;
          max-width: 500px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        .logo-circle {
          width: 72px;
          height: 72px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .logo-icon {
          font-size: 36px;
        }

        .brand-name {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.5px;
        }

        .brand-tagline h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 40px;
          font-weight: 800;
          color: white;
          line-height: 1.2;
          margin-bottom: 16px;
          letter-spacing: -1px;
        }

        .brand-tagline p {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 40px;
        }

        .brand-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .feature-icon {
          font-size: 20px;
          color: white;
          font-weight: 700;
        }

        .feature-text {
          font-size: 16px;
          color: white;
          font-weight: 600;
        }

        .brand-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .stat-box {
          text-align: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-value {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: white;
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
        }

        /* Form Section */
        .auth-form-section {
          padding: 80px 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          min-height: 100%;
        }

        .form-wrapper {
          width: 100%;
          max-width: 480px;
        }

        .form-header {
          margin-bottom: 40px;
        }

        .form-title {
          font-family: 'Outfit', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .form-subtitle {
          font-size: 16px;
          color: #475569;
          font-weight: 500;
        }

        /* Role Selector */
        .role-selector {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .role-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px 16px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .role-btn:hover {
          border-color: #818cf8;
          background: rgba(99, 102, 241, 0.1);
          transform: translateY(-2px);
        }

        .role-btn.active {
          border-color: #6366f1;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .role-icon {
          font-size: 28px;
          line-height: 1;
        }

        .role-name {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
        }

        .role-description {
          text-align: center;
          padding: 16px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
          border-radius: 12px;
          font-size: 14px;
          color: #475569;
          margin-bottom: 32px;
          font-weight: 500;
          min-height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Form */
        .auth-form {
          width: 100%;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          font-size: 18px;
          pointer-events: none;
          z-index: 1;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          padding-left: 48px;
          font-size: 15px;
          font-family: inherit;
          color: #0f172a;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        .form-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .toggle-password {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          padding: 4px;
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }

        .toggle-password:hover {
          opacity: 1;
        }

        /* Form Options */
        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          color: #475569;
          font-weight: 500;
          position: relative;
        }

        .checkbox-input {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid #e2e8f0;
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          background-color: white;
          transition: all 0.2s ease;
        }

        .checkbox-input:checked {
          background-color: #6366f1;
          border-color: #6366f1;
        }

        .checkbox-input:checked::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .checkbox-input:hover {
          border-color: #6366f1;
        }

        .forgot-link {
          font-size: 14px;
          color: #6366f1;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .forgot-link:hover {
          color: #4f46e5;
          text-decoration: underline;
        }

        /* Error Message */
        .error-message {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: #fef2f2;
          border: 1px solid #ef4444;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .error-icon {
          font-size: 18px;
          flex-shrink: 0;
        }

        .error-text {
          font-size: 14px;
          color: #ef4444;
          font-weight: 600;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          padding: 16px 32px;
          background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.4);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-arrow {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) .btn-arrow {
          transform: translateX(4px);
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Footer */
        .form-footer {
          margin-top: 32px;
          text-align: center;
        }

        .footer-text {
          font-size: 14px;
          color: #475569;
          font-weight: 500;
        }

        .footer-link {
          color: #6366f1;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: #4f46e5;
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .auth-container {
            min-width: auto;
            max-width: 1000px;
          }

          .auth-brand-section,
          .auth-form-section {
            padding: 60px 50px;
          }

          .brand-tagline h2 {
            font-size: 36px;
          }
        }

        @media (max-width: 1024px) {
          .auth-container {
            min-width: auto;
            max-width: 900px;
          }
        }

        @media (max-width: 968px) {
          .auth-container {
            grid-template-columns: 1fr;
            margin: 20px;
            min-width: auto;
          }

          .auth-brand-section {
            padding: 50px 40px;
            min-height: auto;
          }

          .auth-form-section {
            padding: 50px 40px;
            min-height: auto;
          }

          .brand-tagline h2 {
            font-size: 32px;
          }

          .brand-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .auth-container {
            margin: 10px;
          }

          .brand-tagline h2 {
            font-size: 28px;
          }

          .form-title {
            font-size: 32px;
          }
        }

        @media (max-width: 640px) {
          .auth-container {
            margin: 0;
            border-radius: 0;
            min-height: 100vh;
            min-width: auto;
          }

          .auth-brand-section,
          .auth-form-section {
            padding: 40px 24px;
            min-height: auto;
          }

          .brand-logo {
            margin-bottom: 32px;
          }

          .logo-circle {
            width: 56px;
            height: 56px;
            border-radius: 16px;
          }

          .logo-icon {
            font-size: 28px;
          }

          .brand-name {
            font-size: 24px;
          }

          .brand-tagline h2 {
            font-size: 24px;
          }

          .brand-tagline p {
            font-size: 16px;
            margin-bottom: 32px;
          }

          .brand-features {
            gap: 12px;
            margin-bottom: 32px;
          }

          .feature-item {
            padding: 10px 16px;
          }

          .feature-text {
            font-size: 14px;
          }

          .brand-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .stat-box {
            padding: 16px 12px;
          }

          .stat-value {
            font-size: 24px;
          }

          .stat-label {
            font-size: 11px;
          }

          .form-title {
            font-size: 28px;
          }

          .form-subtitle {
            font-size: 15px;
          }

          .role-selector {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .role-btn {
            padding: 16px 12px;
          }

          .role-icon {
            font-size: 24px;
          }

          .role-name {
            font-size: 13px;
          }

          .role-description {
            font-size: 13px;
            padding: 14px;
          }

          .form-input {
            padding: 12px 14px;
            padding-left: 44px;
            font-size: 14px;
          }

          .input-icon {
            left: 14px;
            font-size: 16px;
          }

          .form-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .submit-btn {
            padding: 14px 24px;
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .auth-brand-section,
          .auth-form-section {
            padding: 32px 20px;
          }

          .brand-tagline h2 {
            font-size: 22px;
          }

          .brand-tagline p {
            font-size: 15px;
          }

          .form-title {
            font-size: 24px;
          }

          .role-btn {
            padding: 14px 8px;
          }

          .role-icon {
            font-size: 22px;
          }

          .role-name {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default Login;