const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware for teacher/admin only
const teacherOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'teacher' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an teacher' });
    }
};

// @desc    Get all published courses
// @route   GET /api/courses
// @access  Public (for students to browse)
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({ status: 'published' })
            .populate('teacher', 'firstName lastName email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: ' + error.message
        });
    }
});

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('teacher', 'firstName lastName email')
            .populate('studentsEnrolled', 'firstName lastName');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: ' + error.message
        });
    }
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/teacher
router.post('/', protect, teacherOnly, async (req, res) => {
    const { title, description, category, duration, level, thumbnail } = req.body;

    try {
        const course = new Course({
            title,
            description,
            category,
            duration,
            level,
            thumbnail,
            teacher: req.user._id
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Get logged in user's enrolled courses (or created courses if teacher)
// @route   GET /api/courses/mycourses
// @access  Private
router.get('/mycourses', protect, async (req, res) => {
    try {
        if (req.user.role === 'teacher') {
            const courses = await Course.find({ teacher: req.user._id });
            res.json(courses);
        } else {
            // For students, find courses where their ID is in studentsEnrolled
            const courses = await Course.find({ studentsEnrolled: req.user._id }).populate('teacher', 'name');
            res.json(courses);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
