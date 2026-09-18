import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LayoutProvider } from './context/LayoutContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import TeacherLayout from './components/TeacherLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
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
import CourseOverview from './pages/CourseOverview';
import Contact from './pages/Contact';
import Support from './pages/Support';
import About from './pages/About';
import Ide from './pages/Ide';
import QuizPlayer from './pages/QuizPlayer';
import AssignmentDetails from './pages/AssignmentDetails';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageTeachers from './pages/admin/ManageTeachers';
import AdminManageCourses from './pages/admin/ManageCourses';
import ManageAssignments from './pages/admin/ManageAssignments';
import ReportsAndAnalytics from './pages/admin/ReportsAndAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

// Teacher Components
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherCourses from './pages/teacher/TeacherCourses';
import CreateCourse from './pages/teacher/CreateCourse';
import EditCourse from './pages/teacher/EditCourse';
import CourseStudents from './pages/teacher/CourseStudents';
import TeacherAssignments from './pages/teacher/TeacherAssignments';
import CreateAssignment from './pages/teacher/CreateAssignment';
import CreateQuiz from './pages/teacher/CreateQuiz';
import GradeAssignment from './pages/teacher/GradeAssignment';
import TeacherProfile from './pages/teacher/TeacherProfile';
import TeacherAnalytics from './pages/teacher/TeacherAnalytics';

// Route Protection Component
import RoleRoute from './components/routes/RoleRoute';

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

              {/* Shared Protected Routes */}
              <Route path="/profile" element={<RoleRoute><Layout><Profile /></Layout></RoleRoute>} />
              <Route path="/contact" element={<RoleRoute><Layout><Contact /></Layout></RoleRoute>} />
              <Route path="/support" element={<RoleRoute><Layout><Support /></Layout></RoleRoute>} />
              <Route path="/about" element={<RoleRoute><Layout><About /></Layout></RoleRoute>} />
              <Route path="/ide" element={<RoleRoute><Layout><Ide /></Layout></RoleRoute>} />

              {/* Student Routes */}
              <Route path="/dashboard" element={<RoleRoute allowedRoles={['student']}><Layout><Home /></Layout></RoleRoute>} />
              <Route path="/analytics" element={<RoleRoute allowedRoles={['student']}><Layout><Dashboard /></Layout></RoleRoute>} />
              <Route path="/courses" element={<RoleRoute allowedRoles={['student']}><Layout><Courses /></Layout></RoleRoute>} />
              <Route path="/favourites" element={<RoleRoute allowedRoles={['student']}><Layout><Favourites /></Layout></RoleRoute>} />
              <Route path="/feedback" element={<RoleRoute allowedRoles={['student']}><Layout><Feedback /></Layout></RoleRoute>} />
              <Route path="/focus-mode" element={<RoleRoute allowedRoles={['student']}><FocusMode /></RoleRoute>} />
              <Route path="/assignments" element={<RoleRoute allowedRoles={['student']}><Layout><Assignments /></Layout></RoleRoute>} />
              <Route path="/attendance" element={<RoleRoute allowedRoles={['student']}><Layout><Attendance /></Layout></RoleRoute>} />
              <Route path="/course-overview/:id" element={<RoleRoute allowedRoles={['student']}><Layout><CourseOverview /></Layout></RoleRoute>} />
              <Route path="/course/:id" element={<RoleRoute allowedRoles={['student']}><Layout><CoursePlayer /></Layout></RoleRoute>} />
              <Route path="/quiz/:id" element={<RoleRoute allowedRoles={['student']}><Layout><QuizPlayer /></Layout></RoleRoute>} />
              <Route path="/assignment/:id" element={<RoleRoute allowedRoles={['student']}><Layout><AssignmentDetails /></Layout></RoleRoute>} />

              {/* Teacher Routes */}
              <Route path="/teacher" element={<RoleRoute allowedRoles={['teacher']}><TeacherLayout /></RoleRoute>}>
                <Route index element={<Navigate to="/teacher/dashboard" replace />} />
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="courses" element={<TeacherCourses />} />
                <Route path="course/create" element={<CreateCourse />} />
                <Route path="course/edit/:id" element={<EditCourse />} />
                <Route path="course/:id/students" element={<CourseStudents />} />
                <Route path="assignments" element={<TeacherAssignments />} />
                <Route path="assignment/create" element={<CreateAssignment />} />
                <Route path="quiz/create" element={<CreateQuiz />} />
                <Route path="assignment/:id/grade" element={<GradeAssignment />} />
                <Route path="assignment/:id/edit" element={<CreateAssignment />} />
                <Route path="profile" element={<TeacherProfile />} />
                <Route path="analytics" element={<TeacherAnalytics />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<RoleRoute allowedRoles={['admin']}><AdminLayout /></RoleRoute>}>
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
