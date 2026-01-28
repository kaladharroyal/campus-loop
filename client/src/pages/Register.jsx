import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';
import loginImg from '../assets/campus-loop-logo.png';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [phone, setPhone] = useState('');
  const [rollno, setRollno] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(firstName, lastName, email, password, role, branch, year, phone, rollno);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Remove inline style as CCS handles max-width now */}
      <div className="login-container">
        <div className="form-section">
          <div className="header">
            <h1>Create Account</h1>
            <p>Register as a Student, Faculty.</p>
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
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {role === 'student' && (
              <div className="form-group">
                <label htmlFor="rollno">Roll No</label>
                <input
                  type="text"
                  id="rollno"
                  placeholder="Roll No"
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {role === 'student' && (
              <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label htmlFor="branch">Branch</label>
                  <input
                    type="text"
                    id="branch"
                    placeholder="e.g. CSE"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="year">Year</label>
                  <input
                    type="text"
                    id="year"
                    placeholder="e.g. 3"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
              </div>
            )}

            {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}

            <button type="submit" className="btn-primary">Register</button>

            <div className="mt-4">
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Already have an account? <Link to="/login" className="text-link">Login</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="image-section">
          <img src={loginImg} alt="Study" />
        </div>
      </div>
    </div>
  );
};

export default Register;
