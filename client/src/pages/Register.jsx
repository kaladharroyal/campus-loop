import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [phone, setPhone] = useState('');
  const [rollno, setRollno] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(firstName, lastName, email, password, role, branch, year, phone, rollno);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (roleType) => {
    switch (roleType) {
      case 'student': return '🎓';
      case 'teacher': return '👨‍🏫';
      default: return '🎓';
    }
  };

  const canProceedToStep2 = () => {
    return firstName && lastName && email && password && confirmPassword && password === confirmPassword;
  };

  const isFormComplete = () => {
    if (role === 'student') {
      return canProceedToStep2() && rollno && phone;
    }
    return canProceedToStep2() && phone;
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
              <h2>Start Your Learning Journey</h2>
              <p>Create your account to unlock personalized courses, track your progress, and join a thriving academic community.</p>
            </div>

            <div className="registration-benefits">
              <div className="benefit-card">
                <div className="benefit-icon">🚀</div>
                <div className="benefit-content">
                  <h3 className="benefit-title">Instant Access</h3>
                  <p className="benefit-desc">Get immediate access to all courses and materials</p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">📊</div>
                <div className="benefit-content">
                  <h3 className="benefit-title">Track Progress</h3>
                  <p className="benefit-desc">Monitor your learning journey in real-time</p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">🏆</div>
                <div className="benefit-content">
                  <h3 className="benefit-title">Earn Certificates</h3>
                  <p className="benefit-desc">Get recognized for your achievements</p>
                </div>
              </div>
            </div>

            <div className="trust-indicators">
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span className="trust-text">Secure & Private</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">⚡</span>
                <span className="trust-text">Instant Setup</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                <span className="trust-text">Free to Join</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="auth-form-section">
          <div className="form-wrapper register-form">
            <div className="form-header">
              <h2 className="form-title ">Create Account</h2>
              <p className="form-subtitle">Join thousands of learners today</p>
            </div>

            {/* Progress Indicator */}
            <div className="progress-steps">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-label">Basic Info</div>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-label">Details</div>
              </div>
            </div>

            {/* Role Selector */}
            <div className="role-selector">
              {['student', 'teacher'].map((roleType) => (
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

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="form-step">
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="firstName" className="input-label">
                        First Name
                      </label>
                      <div className="input-wrapper">
                        <input
                          type="text"
                          id="firstName"
                          className="form-input"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="lastName" className="input-label">
                        Last Name
                      </label>
                      <div className="input-wrapper">
                        <input
                          type="text"
                          id="lastName"
                          className="form-input"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="email" className="input-label">
                      Email Address
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">✉️</span>
                      <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="john.doe@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    <div className="input-hint">At least 6 characters</div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="confirmPassword" className="input-label">
                      Confirm Password
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🔒</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        className="form-input"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <div className="input-error">Passwords do not match</div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="submit-btn"
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedToStep2()}
                  >
                    <span>Continue</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              )}

              {/* Step 2: Additional Details */}
              {currentStep === 2 && (
                <div className="form-step">
                  {role === 'student' && (
                    <div className="input-group">
                      <label htmlFor="rollno" className="input-label">
                        Roll Number
                      </label>
                      <div className="input-wrapper">
                        <span className="input-icon">🎫</span>
                        <input
                          type="text"
                          id="rollno"
                          className="form-input"
                          placeholder="CSE001"
                          value={rollno}
                          onChange={(e) => setRollno(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="input-group">
                    <label htmlFor="phone" className="input-label">
                      Phone Number
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">📱</span>
                      <input
                        type="tel"
                        id="phone"
                        className="form-input"
                        placeholder="+91 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {role === 'student' && (
                    <div className="input-row">
                      <div className="input-group">
                        <label htmlFor="branch" className="input-label">
                          Branch
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="branch"
                            className="form-input"
                            placeholder="Computer Science"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="input-group">
                        <label htmlFor="year" className="input-label">
                          Year
                        </label>
                        <div className="input-wrapper">
                          <select
                            id="year"
                            className="form-input"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          >
                            <option value="">Select Year</option>
                            <option value="1">First Year</option>
                            <option value="2">Second Year</option>
                            <option value="3">Third Year</option>
                            <option value="4">Fourth Year</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="error-message">
                      <span className="error-icon">⚠️</span>
                      <span className="error-text">{error}</span>
                    </div>
                  )}

                  <div className="form-actions">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={() => setCurrentStep(1)}
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      className={`submit-btn ${isLoading ? 'loading' : ''}`}
                      disabled={isLoading || !isFormComplete()}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner"></span>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <span className="btn-arrow">✓</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="form-footer">
              <p className="footer-text">
                Already have an account?{' '}
                <Link to="/login" className="footer-link">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;