# CampusLoop — Modern Learning Management System (LMS)

[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%26%20Express%205-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%26%20Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Monaco Editor](https://img.shields.io/badge/Code%20Editor-Monaco%20Editor-007ACC?logo=visualstudiocode&logoColor=white)](https://microsoft.github.io/monaco-editor/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

**CampusLoop** is a comprehensive, full-stack Learning Management and Career Acceleration Platform designed for students, educators, and administrators. Built with modern web technologies, it delivers an interactive learning experience with role-based dashboards, video-based course modules, automated quizzes, assignment management, real-time analytics, and an integrated multi-language online IDE.

---

## Table of Contents

- [Features](#features)
  - [Student Portal](#student-portal)
  - [Teacher Suite](#teacher-suite)
  - [Admin Control Center](#admin-control-center)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [Role-Based Access](#role-based-access)
  - [Online Code Runner (IDE)](#online-code-runner-ide)
  - [Course & Assignment Workflows](#course--assignment-workflows)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Student Portal
- **Course Catalog & Enrolment**: Browse curated courses across web development, AI/ML, cloud, and data science; track chapter progress with structured video lessons and learning materials.
- **Interactive In-Browser IDE**: Integrated Monaco code editor with live execution engine (Piston API) supporting Python, JavaScript, Java, C++, Go, Rust, and more.
- **Quizzes & Assessments**: Interactive timed MCQ quizzes with instant scoring, answer reviews, and explanations.
- **Assignments & Submissions**: Submit solutions with file uploads, track deadlines, and receive grades and feedback from instructors.
- **Focus Mode**: Distraction-free Pomodoro study timer with sound effects and productivity logs.
- **Analytics & Attendance**: Visual progress charts via Recharts, course completion tracking, grade trends, and attendance history.
- **Personalization**: Dark/Light theme switching, course bookmarks/favourites, and user profiles.

### Teacher Suite
- **Course Studio**: Create, edit, and manage courses, curriculum modules, video lessons, and downloadable resources.
- **Assignment & Quiz Builder**: Design coding and written assignments, set deadlines, and configure auto-graded multiple-choice quizzes.
- **Grading & Feedback Workflow**: Review student submissions, assign scores, and leave constructive feedback.
- **Student Progress Monitoring**: Track enrolled students, view individual milestone completions, and manage course rosters.
- **Teacher Analytics**: Visualize class performance distributions, average quiz scores, and student engagement metrics.

### Admin Control Center
- **System Overview**: Platform-wide metrics including total students, teachers, active courses, submissions, and platform activity.
- **User Management**: Search, filter, approve, and manage permissions for student and instructor accounts.
- **Course & Content Governance**: Review, verify, and moderate courses across all departments.
- **Reports & System Analytics**: Generate high-level analytics and exportable reporting data.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19, Vite, React Router DOM v7 | High-performance SPA with modern routing |
| **Styling & UI** | Vanilla CSS Design System, Framer Motion, React Icons | Glassmorphism UI, smooth transitions, responsive layout |
| **Charts & Visuals** | Recharts | Interactive data visualization for student & teacher analytics |
| **Code Execution** | `@monaco-editor/react`, Piston API | VS Code-grade code editor & multi-language execution |
| **Backend** | Node.js, Express.js (v5) | Modular RESTful API architecture |
| **Database** | MongoDB, Mongoose (v9) | Flexible document data modeling & relationship schema |
| **Authentication** | JWT (`jsonwebtoken`), `bcryptjs` | Secure stateless auth with role-based middleware |
| **File Uploads** | Multer | Handling file uploads for course materials and assignments |
| **Testing** | Jest, Supertest | Backend API unit & integration testing |

---

## Project Structure

```text
campus-loop/
├── client/                     # Frontend Application (React + Vite)
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── assets/             # Images, SVGs, and brand assets
│   │   ├── components/         # Reusable UI components & layouts
│   │   │   ├── admin/          # Admin-specific UI & layouts
│   │   │   ├── routes/         # Protected route & role wrappers (RoleRoute)
│   │   │   └── Layout.jsx      # Main student & teacher navigation shell
│   │   ├── config/             # API configuration & base URLs
│   │   ├── context/            # Global state (AuthContext, ThemeContext, LayoutContext)
│   │   ├── data/               # Mock datasets and static lookups
│   │   ├── pages/              # Main route pages
│   │   │   ├── admin/          # Admin dashboard & management views
│   │   │   ├── teacher/        # Teacher studio, grading, & analytics
│   │   │   ├── CoursePlayer.jsx
│   │   │   ├── Ide.jsx         # Monaco-based online code runner
│   │   │   ├── FocusMode.jsx   # Pomodoro study tool
│   │   │   └── QuizPlayer.jsx  # MCQ quiz runner
│   │   ├── styles/             # Modular CSS stylesheets
│   │   ├── App.jsx             # Route definitions & app providers
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   └── vite.config.js          # Vite config with API proxy
│
├── server/                     # Backend API (Node.js + Express)
│   ├── controllers/            # Route business logic handlers
│   ├── middleware/             # Auth, role check, & error handling middlewares
│   ├── models/                 # Mongoose schemas (User, Course, Assignment, Submission, Attendance)
│   ├── routes/                 # REST endpoints
│   │   ├── admin.js            # Admin analytics & user operations
│   │   ├── assignments.js      # Assignment & submission endpoints
│   │   ├── attendance.js       # Attendance logs
│   │   ├── auth.js             # User login, register, profile
│   │   ├── courses.js          # Course CRUD & enrollment
│   │   ├── reports.js          # Analytics & data export
│   │   └── teacher.js          # Instructor studio endpoints
│   ├── tests/                  # Jest test suites
│   ├── index.js                # Server entry point & Piston code runner integration
│   └── package.json
│
└── Reports/                    # Project logs, algorithm documentation, & sprint notes
```

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (Local instance running on `localhost:27017` or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/kaladharroyal/campus-loop.git
cd campus-loop
```

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lms
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend API will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure client environment variables in `.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The client application will run at `http://localhost:5173`.

---

## Usage

### Running the Application
1. Ensure MongoDB is running.
2. Launch the backend server (`cd server && npm start`).
3. Launch the frontend dev server (`cd client && npm run dev`).
4. Open `http://localhost:5173` in your web browser.

### Role-Based Access
- **Student**: Sign up via `/register` with role `student` or login to access courses, submit assignments, take quizzes, use the online IDE, and track analytics.
- **Teacher**: Register or log in with role `teacher` to access the Teacher Studio at `/teacher`, create courses, publish assignments, and grade student submissions.
- **Admin**: Log in with an administrator account to access `/admin` for user moderation, system reports, and platform oversight.

### Online Code Runner (IDE)
Navigate to `/ide` to use the multi-language compiler:
1. Select your desired programming language (JavaScript, Python, Java, C++, Go, Rust, TypeScript, etc.).
2. Write or paste code into the Monaco editor.
3. Provide custom `stdin` inputs if required.
4. Click **Run Code** to execute via the Piston engine and view stdout/stderr output.

### Course & Assignment Workflows
- **Course Enrollment**: Go to `/courses`, select any course card, and click **Enroll Now** to start video lessons and track lesson completion.
- **Submitting Assignments**: Go to `/assignments`, select a pending task, upload your file or text response, and click **Submit**.
- **Focus Mode**: Click the **Focus Mode** tab or visit `/focus-mode` to start Pomodoro intervals for deep work.

---

## API Reference

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new student or teacher | Public |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | Public |
| `GET` | `/api/auth/me` | Fetch logged-in user details | Authenticated |
| `GET` | `/api/courses` | Fetch all public courses with filtering | Authenticated |
| `GET` | `/api/courses/:id` | Get single course details & lesson list | Authenticated |
| `POST` | `/api/courses/:id/enroll` | Enroll student in a course | Student |
| `POST` | `/api/courses/:id/progress` | Update chapter/lesson completion progress | Student |
| `POST` | `/api/execute-code` | Execute code via Piston engine (Multi-lang) | Authenticated |
| `GET` | `/api/assignments` | List all assignments for user/course | Authenticated |
| `POST` | `/api/assignments/:id/submit` | Submit solution with optional file upload | Student |
| `POST` | `/api/teacher/courses` | Create a new course | Teacher |
| `POST` | `/api/teacher/assignments` | Create a new assignment or quiz | Teacher |
| `POST` | `/api/teacher/submissions/:id/grade` | Grade an assignment submission | Teacher |
| `GET` | `/api/admin/dashboard` | Fetch platform-wide statistics | Admin |
| `GET` | `/api/admin/students` | Manage student accounts | Admin |
| `GET` | `/api/admin/teachers` | Manage teacher accounts | Admin |
| `GET` | `/api/reports/analytics` | Fetch system analytics & reports | Admin / Teacher |

---

## Testing

Backend unit and integration tests are powered by Jest and Supertest:

```bash
# Navigate to server directory
cd server

# Run test suite
npm test
```

---

## Contributing

Contributions are always welcome! Please follow these steps to contribute:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

Please ensure your code follows the project's linting standards and all tests pass before submitting a PR.

---

## License

This project is licensed under the [ISC License](LICENSE).
