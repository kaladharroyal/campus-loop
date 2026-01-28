import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ManageCourses from './pages/ManageCourses';
import Courses from './pages/Courses';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import Attendance from './pages/Attendance';
import Profile from './pages/Profile';
import Favourites from './pages/Favourites';
import Feedback from './pages/Feedback';
import FocusMode from './pages/FocusMode';
import CoursePlayer from './pages/CoursePlayer';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><Layout><Courses /></Layout></ProtectedRoute>} />
            <Route path="/favourites" element={<ProtectedRoute><Layout><Favourites /></Layout></ProtectedRoute>} />
            <Route path="/feedback" element={<ProtectedRoute><Layout><Feedback /></Layout></ProtectedRoute>} />
            <Route path="/focus-mode" element={<ProtectedRoute><FocusMode /></ProtectedRoute>} />
            <Route path="/assignments" element={<ProtectedRoute><Layout><Assignments /></Layout></ProtectedRoute>} />
            <Route path="/attendance" element={<ProtectedRoute><Layout><Attendance /></Layout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
            <Route path="/manage-courses" element={<ProtectedRoute><Layout><ManageCourses /></Layout></ProtectedRoute>} />
            <Route path="/course/:title" element={<ProtectedRoute><Layout><CoursePlayer /></Layout></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
