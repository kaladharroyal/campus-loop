
<<<<<<< HEAD
=======
Campus Loop is a comprehensive Learning Management System designed to facilitate interaction between students, teachers, and administrators.

## ✨ Features

### 1. Authentication System

- **User Registration**: Students register with firstName, lastName, email, password, role, branch, year, phone
- **Login**: JWT-based authentication with 30-day token expiration
- **Profile Management**: Update personal details, branch, year, phone number
- **Protected Routes**: ProtectedRoute component guards authenticated pages
- **Role-Based Access**: Support for `student`, `teacher`, `admin` roles
- **Password Security**: Bcrypt hashing with salt rounds

### 2. Dashboard & Analytics

- **Learning Streak**: Tracks consecutive daily login activity
- **Course Enrollment Stats**: Visual cards showing number of enrolled courses
- **Time Spent Tracking**: Monitor learning hours
- **Progress Charts**: Line chart visualization of learning progress
- **Assignment Scores**: Table view of scores across all courses
- **Results Trend**: Bar chart for course performance trends

### 3. Course Management

#### Browse Courses
- Search and filter available courses
- Categories: MERN, Java, AI/ML, Database, Networks, etc.
- Grid/List view toggle
- Course details: Description, Duration, Level, teacher

#### Course Player
- Integrated YouTube video player
- Timestamped curriculum navigation
- Chapter-based content organization
- Supports detailed curriculum (e.g., 14-chapter Java course)
- Course notes and resources

### 4. Assignment Management

- **Multiple View Modes**:
  - **List View**: Detailed table with all assignment information
  - **Grid View**: Card-based layout for visual browsing
  - **Calendar View**: Due dates displayed on calendar
- **Assignment Details**: Title, Description, Course, Due Date
- **Submission Tracking**: Upload URL, submission timestamp
- **Grading System**: teacher feedback and grades
- **Quiz Integration**: Interactive quizzes linked to assignments

### 5. Attendance Tracking

- Visual progress circles per subject
- Attendance percentage calculation
- Date-wise attendance records
- Status tracking: Present, Absent, Late
- Course-specific attendance reports

### 6. Integrated Development Environment (IDE)

> **⭐ Major Feature Addition in Version 2.0**

- **10 Programming Languages**:
  1. Python (3.10.0)
  2. JavaScript (18.15.0)
  3. Java (15.0.2)
  4. C++ (10.2.0)
  5. C (10.2.0)
  6. Go (1.16.2)
  7. Rust (1.68.2)
  8. PHP (8.2.3)
  9. Ruby (3.0.1)
  10. TypeScript (5.0.3)

- **Features**:
  - Monaco Editor (VS Code experience)
  - Syntax highlighting for all languages
  - Real-time code execution
  - Input panel for stdin support
  - Output panel with stdout/stderr separation
  - Execution history (last 10 runs)
  - Save/Load code files
  - Dark theme interface

### 7. Additional Features

- **Favorites**: Mark and quick-access favorite courses
- **Feedback System**: Submit course feedback with emoji ratings
- **Focus Mode**: Distraction-free timer for study sessions
- **Theme Context**: Global theme management
- **Responsive UI**: Adapts to different screen sizes
- **Sidebar Navigation**: Quick access to all features

## Tech Stack

- **Frontend**: React, Vite, React Router, Recharts, Monaco Editor
- **Backend**: Node.js, Express
- **Database**: MongoDB (assumed based on pattern)
>>>>>>> 0c348398fc323d1513b6edf60847e9cbebd007ac
