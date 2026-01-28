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

// Middleware for instructor/admin only
const instructorOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'instructor' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an instructor' });
    }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const courses = await Course.find({}).populate('instructor', 'name email');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Instructor
router.post('/', protect, instructorOnly, async (req, res) => {
    const { title, description, category, duration, level, thumbnail } = req.body;

    try {
        const course = new Course({
            title,
            description,
            category,
            duration,
            level,
            thumbnail,
            instructor: req.user._id
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Get logged in user's enrolled courses (or created courses if instructor)
// @route   GET /api/courses/mycourses
// @access  Private
router.get('/mycourses', protect, async (req, res) => {
    try {
        if (req.user.role === 'instructor') {
            const courses = await Course.find({ instructor: req.user._id });
            res.json(courses);
        } else {
            // For students, find courses where their ID is in studentsEnrolled
            const courses = await Course.find({ studentsEnrolled: req.user._id }).populate('instructor', 'name');
            res.json(courses);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
