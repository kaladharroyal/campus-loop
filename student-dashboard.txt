# Student Dashboard LMS - Project Documentation

## 1. Overview
The Student Dashboard is a comprehensive Learning Management System (LMS) designed to help students track their courses, assignments, attendance, and learning progress. It provides an intuitive interface for browsing courses, watching video lessons, and managing daily academic tasks.

## 2. Technology Stack

### Frontend (Client)
- **Framework:** React.js (Vite)
- **Routing:** React Router DOM v7
- **Styling:** Vanilla CSS (Modular & Global styles)
- **State Management:** React Context API (AuthContext)

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) & BcryptJS

## 3. Project Structure
```
root/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Sidebar, Topbar)
│   │   ├── pages/          # Page views (Dashboard, Courses, Player)
│   │   ├── context/        # Global state (Auth)
│   │   ├── data/           # Mock data (Course curriculums)
│   │   ├── styles/         # CSS files
│   │   ├── assets/         # Images and icons
│   │   └── App.jsx         # Main Router configuration
│   └── package.json
│
└── server/                 # Backend API
    ├── models/             # Database Schemas (User, Attendance, Feedback)
    ├── routes/             # API Endpoints
    ├── controllers/        # Logic handlers
    ├── index.js            # Server entry point
    └── package.json
```

## 4. Key Features

### 🔐 Authentication
- **User Registration:** Students can sign up with Name, Email, ID, Mobile, and Password.
- **Login:** Secure login with JWT-based session management.
- **Profile Management:** Editable profile page to update personal details.

### 🏠 Dashboard (Home)
- **Course Overview:** View registered courses at a glance.
- **Navigation:** Quick access to course content directly from the dashboard cards.
- **Favorites:** Mark courses as favorites for quick access.

### 📚 Course Management
- **Browse Courses:** Search and filter available courses (MERN, Java, AI, etc.).
- **Course Player:** Integrated video player with timestamped curriculum (YouTube embeds).
- **Curriculum:** Detailed chapter breakdown for deep learning (e.g., 14-chapter Java course).

### 📝 Assignments
- **View Modes:**
  - **List View:** Table format for detailed info.
  - **Grid View:** Card-based layout.
  - **Calendar View:** Visual representation of due dates.
- **Quizzes:** Interactive quizzes linked to assignments.

### 📊 Attendance Tracking
- Visual progress circles showing attendance percentage per subject.

### 🧠 Focus & Productivity
- **Focus Mode:** A distraction-free timer interface.
- **Learning Streak:** Tracks daily login/learning activity.
- **Feedback System:** Submit course feedback with emotion-based ratings.

## 5. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user & return JWT |
| PUT | `/api/auth/profile` | Update user profile |
| GET | `/api/attendance/:id` | Get attendance stats |
| POST | `/api/feedback` | Submit course feedback |

## 6. Setup & Installation

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas URI

### Steps
1. **Clone Repository**
   ```bash
   git clone <repo-url>
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create .env file with MONGO_URI and JWT_SECRET
   node index.js
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access Application**
   Open http://localhost:5173 (or port specified by Vite).

---
*Generated on 01:39 AM  January 22, 2026*
