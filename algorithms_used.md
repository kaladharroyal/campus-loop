# Algorithms and Logic Used in Codebase

This document lists the algorithms and key logic identified in the `kaladharroyal/lms` project.

| Algorithm / Logic | File Name | Method / Description |
| :--- | :--- | :--- |
| **Password Hashing** | `server/models/User.js` | Uses `bcryptjs` to generate salt (`genSalt`) and hash passwords (`hash`) before saving users. distinct `matchPassword` method compares candidate password with hash. |
| **JWT Generation** | `server/routes/auth.js` | Uses `jsonwebtoken` (`jwt.sign`) to create signed tokens with payload and expiration for user sessions. |
| **JWT Verification** | `server/middleware/authMiddleware.js` | Uses `jsonwebtoken` (`jwt.verify`) to decode and validate tokens from the `Authorization` header. |
| **Sorting** | `server/routes/courses.js` | Uses MongoDB/Mongoose `.sort({ createdAt: -1 })` to order courses by newest first. |
| **Data Aggregation (Reports)** | `server/routes/reports.js` | Implements manual aggregation logic using JavaScript array methods:<br>- `filter`: To count present/absent attendance.<br>- `reduce`: To calculate total classes, present counts, and teacher workload (credits).<br>- `map`: To transform raw database documents into structured report data.<br>- `Promise.all`: To handle concurrent asynchronous database queries for multiple users/courses. |
| **Date Range Filtering** | `server/routes/reports.js` | Uses MongoDB query operators (`$gte`, `$lte`) to filter records within the current month for summary reports. |
| **Search Filtering** | `client/src/pages/Courses.jsx` | Uses `Array.prototype.filter` and `String.prototype.includes` to filter courses client-side based on title, description, or category matching the search query. |
| **Data Mapping & Augmentation** | `client/src/pages/Courses.jsx` | Uses `Array.prototype.map` to iterate over course data and inject fallback images and random "health" metrics for UI visualization. |
| **Streak Calculation** | `client/src/pages/Dashboard.jsx` | Custom logic to parse `localStorage` dates, compare with today/yesterday, and increment or reset a learning streak counter. |
| **History Queue Management** | `client/src/pages/Ide.jsx` | Uses array spread syntax and `.slice(0, 10)` to maintain a fixed-size queue (FIFO-like) of the last 10 code execution history items. |
| **Language Lookup** | `client/src/pages/Ide.jsx` | Uses `Array.prototype.find` to retrieve language configuration objects based on selected value. |
