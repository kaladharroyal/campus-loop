import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LayoutProvider } from './context/LayoutContext';
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
import Contact from './pages/Contact';
import Support from './pages/Support';
import About from './pages/About';
import Ide from './pages/Ide';



// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageTeachers from './pages/admin/ManageTeachers';
import AdminManageCourses from './pages/admin/ManageCourses';
import ManageAssignments from './pages/admin/ManageAssignments';
import ReportsAndAnalytics from './pages/admin/ReportsAndAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import FacultyDashboard from './pages/teacher/FacultyDashboard';

// Route Protection Components
import AdminRoute from './components/routes/AdminRoute';
import StudentRoute from './components/routes/StudentRoute';
import TeacherRoute from './components/routes/TeacherRoute';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <LayoutProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Shared/Generic Protected Routes */}
              <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
              <Route path="/contact" element={<ProtectedRoute><Layout><Contact /></Layout></ProtectedRoute>} />
              <Route path="/support" element={<ProtectedRoute><Layout><Support /></Layout></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><Layout><About /></Layout></ProtectedRoute>} />
              <Route path="/ide" element={<ProtectedRoute><Layout><Ide /></Layout></ProtectedRoute>} />

              {/* Student Routes */}
              <Route path="/dashboard" element={<StudentRoute><Layout><Home /></Layout></StudentRoute>} />
              <Route path="/analytics" element={<StudentRoute><Layout><Dashboard /></Layout></StudentRoute>} />
              <Route path="/courses" element={<StudentRoute><Layout><Courses /></Layout></StudentRoute>} />
              <Route path="/favourites" element={<StudentRoute><Layout><Favourites /></Layout></StudentRoute>} />
              <Route path="/feedback" element={<StudentRoute><Layout><Feedback /></Layout></StudentRoute>} />
              <Route path="/focus-mode" element={<StudentRoute><FocusMode /></StudentRoute>} />
              <Route path="/assignments" element={<StudentRoute><Layout><Assignments /></Layout></StudentRoute>} />
              <Route path="/attendance" element={<StudentRoute><Layout><Attendance /></Layout></StudentRoute>} />
              <Route path="/course/:title" element={<StudentRoute><Layout><CoursePlayer /></Layout></StudentRoute>} />

              {/* Teacher Routes */}
              <Route path="/teacher" element={<TeacherRoute><Layout><FacultyDashboard /></Layout></TeacherRoute>}>
                <Route index element={<Navigate to="/teacher/dashboard" replace />} />
                <Route path="dashboard" element={<FacultyDashboard />} />
                <Route path="courses" element={<ManageCourses />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="students" element={<ManageStudents />} />
                <Route path="teachers" element={<ManageTeachers />} />
                <Route path="courses" element={<AdminManageCourses />} />
                <Route path="assignments" element={<ManageAssignments />} />
                <Route path="reports" element={<ReportsAndAnalytics />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </LayoutProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
