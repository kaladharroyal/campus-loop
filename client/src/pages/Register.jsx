import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

  // Get role-specific description
  const getRoleDescription = () => {
    switch (role) {
      case 'student': return 'Join as a student to access courses and track your progress';
      case 'teacher': return 'Join as a teacher to create and manage courses';
      default: return '';
    }
  };

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
            <div className="form-wrapper">
              <div className="form-header">
                <h2 className="form-title">Create Account</h2>
                <p className="form-subtitle">Join thousands of learners today</p>
              </div>

              {/* Progress Indicator */}
              <div className="progress-steps">
                <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                  <div className="step-number">{currentStep > 1 ? '✓' : '1'}</div>
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

              <div className="role-description">
                {getRoleDescription()}
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
                            placeholder="Campus"
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
                            placeholder="Loop"
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
                          placeholder="abcd@gmail.com"
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
          padding: 20px 0;
          
          /* Enforce Light Theme locally */
          --bg-primary: #ffffff;
          --text-primary: #0f172a;
          --text-secondary: #475569;
          
          color: var(--text-primary);
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
          padding: 50px 40px;
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
          margin-bottom: 32px;
        }

        .logo-circle {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .logo-icon {
          font-size: 32px;
        }

        .brand-name {
          font-family: 'Outfit', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.5px;
        }

        .brand-tagline h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: white;
          line-height: 1.2;
          margin-bottom: 16px;
          letter-spacing: -1px;
        }

        .brand-tagline p {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 32px;
        }

        /* Registration Benefits */
        .registration-benefits {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .benefit-card {
          display: flex;
          gap: 14px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .benefit-icon {
          font-size: 28px;
          line-height: 1;
        }

        .benefit-content {
          flex: 1;
        }

        .benefit-title {
          font-size: 16px;
          font-weight: 700;
          color: white;
          margin-bottom: 4px;
        }

        .benefit-desc {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
        }

        /* Trust Indicators */
        .trust-indicators {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .trust-icon {
          font-size: 16px;
        }

        .trust-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
        }

        /* Form Section */
        .auth-form-section {
          padding: 40px 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          min-height: 100%;
          overflow-y: auto;
        }

        .form-wrapper {
          width: 100%;
          max-width: 480px;
        }

        .form-header {
          margin-bottom: 24px;
        }

        .form-title {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .form-subtitle {
          font-size: 15px;
          color: #475569;
          font-weight: 500;
        }

        /* Progress Steps */
        .progress-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
          gap: 20px;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f1f5f9;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-number {
          background: #6366f1;
          color: white;
          border-color: #6366f1;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .progress-step.completed .step-number {
          background: #10b981;
          color: white;
          border-color: #10b981;
        }

        .step-label {
          font-size: 12px;
          font-weight: 600;
          color: #94a3b8;
        }

        .progress-step.active .step-label {
          color: #6366f1;
        }

        .progress-line {
          width: 60px;
          height: 2px;
          background: #e2e8f0;
          margin-top: -24px;
        }

        /* Role Selector */
        .role-selector {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .role-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 18px 16px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
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
          font-size: 26px;
          line-height: 1;
        }

        .role-name {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
        }

        .role-description {
          text-align: center;
          padding: 14px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
          border-radius: 12px;
          font-size: 13px;
          color: #475569;
          margin-bottom: 24px;
          font-weight: 500;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Form */
        .auth-form {
          width: 100%;
        }

        .form-step {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 20px;
        }

        .input-row .input-group {
          margin-bottom: 0;
        }

        .input-label {
          display: block;
          font-size: 13px;
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
          left: 14px;
          font-size: 16px;
          pointer-events: none;
          z-index: 1;
        }

        .form-input {
          width: 100%;
          padding: 12px 14px;
          padding-left: 44px;
          font-size: 14px;
          font-family: inherit;
          color: #0f172a;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.3s ease;
          outline: none;
        }

        .input-row .form-input {
          padding-left: 14px;
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        .form-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        select.form-input {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }

        .toggle-password {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 4px;
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }

        .toggle-password:hover {
          opacity: 1;
        }

        .input-hint {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 6px;
          font-weight: 500;
        }

        .input-error {
          font-size: 11px;
          color: #ef4444;
          margin-top: 6px;
          font-weight: 600;
        }

        /* Error Message */
        .error-message {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: #fef2f2;
          border: 1px solid #ef4444;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .error-icon {
          font-size: 16px;
          flex-shrink: 0;
        }

        .error-text {
          font-size: 13px;
          color: #ef4444;
          font-weight: 600;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          padding: 14px 28px;
          background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
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
          font-size: 16px;
          transition: transform 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) .btn-arrow {
          transform: translateX(4px);
        }

        .spinner {
          width: 16px;
          height: 16px;
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

        /* Form Actions */
        .form-actions {
          display: flex;
          gap: 12px;
        }

        .back-btn {
          flex: 1;
          padding: 14px 28px;
          background: white;
          color: #0f172a;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
        }

        .form-actions .submit-btn {
          flex: 2;
        }

        /* Footer */
        .form-footer {
          margin-top: 28px;
          text-align: center;
        }

        .footer-text {
          font-size: 13px;
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
            padding: 50px 40px;
          }
        }

        @media (max-width: 1024px) {
          .auth-container {
            max-width: 900px;
          }

          .brand-tagline h2 {
            font-size: 32px;
          }
        }

        @media (max-width: 968px) {
          .auth-container {
            grid-template-columns: 1fr;
            margin: 20px;
            min-width: auto;
          }

          .auth-brand-section {
            padding: 40px 35px;
            min-height: auto;
          }

          .auth-form-section {
            padding: 40px 35px;
            min-height: auto;
          }

          .brand-tagline h2 {
            font-size: 28px;
          }
        }

        @media (max-width: 640px) {
          .auth-page {
            padding: 0;
          }

          .auth-container {
            margin: 0;
            border-radius: 0;
            min-height: 100vh;
          }

          .auth-brand-section,
          .auth-form-section {
            padding: 32px 24px;
          }

          .logo-circle {
            width: 52px;
            height: 52px;
          }

          .logo-icon {
            font-size: 26px;
          }

          .brand-name {
            font-size: 22px;
          }

          .brand-tagline h2 {
            font-size: 24px;
          }

          .brand-tagline p {
            font-size: 15px;
            margin-bottom: 28px;
          }

          .benefit-card {
            padding: 14px;
          }

          .benefit-icon {
            font-size: 24px;
          }

          .benefit-title {
            font-size: 15px;
          }

          .benefit-desc {
            font-size: 12px;
          }

          .trust-indicators {
            gap: 16px;
          }

          .form-title {
            font-size: 26px;
          }

          .form-subtitle {
            font-size: 14px;
          }

          .progress-steps {
            gap: 16px;
          }

          .step-number {
            width: 36px;
            height: 36px;
            font-size: 14px;
          }

          .step-label {
            font-size: 11px;
          }

          .progress-line {
            width: 40px;
          }

          .role-btn {
            padding: 14px 12px;
          }

          .role-icon {
            font-size: 22px;
          }

          .role-name {
            font-size: 13px;
          }

          .role-description {
            font-size: 12px;
            padding: 12px;
            min-height: 44px;
          }

          .input-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .form-input {
            padding: 11px 13px;
            padding-left: 42px;
            font-size: 14px;
          }

          .input-icon {
            left: 13px;
            font-size: 15px;
          }

          .form-actions {
            flex-direction: column-reverse;
          }

          .form-actions .submit-btn {
            flex: 1;
          }
        }

        @media (max-width: 480px) {
          .auth-brand-section,
          .auth-form-section {
            padding: 28px 20px;
          }

          .brand-tagline h2 {
            font-size: 22px;
          }

          .form-title {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default Register;