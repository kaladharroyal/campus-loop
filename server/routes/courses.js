const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const CourseProgress = require('../models/CourseProgress');
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





// @desc    Create a course
// @route   POST /api/courses
// @access  Private/teacher
router.post('/', protect, teacherOnly, async (req, res) => {
    const { title, description, category, duration, level, thumbnail, videoLink } = req.body;

    try {
        const course = new Course({
            title,
            description,
            category,
            duration,
            level,
            thumbnail,
            videoLink,
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
        // Safety check
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (req.user.role === 'teacher') {
            const courses = await Course.find({ teacher: req.user._id });
            res.json(courses);
        } else {
            // For students, find courses where their ID is in studentsEnrolled
            const courses = await Course.find({ studentsEnrolled: req.user._id })
                .populate('teacher', 'firstName lastName email')
                .populate('studentsEnrolled', 'firstName lastName'); // Also populate this for debugging/display if needed
            res.json(courses);
        }
    } catch (error) {
        console.error("Error in /mycourses:", error); // Log the actual error
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private
router.post('/:id/enroll', protect, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if already enrolled
        if (course.studentsEnrolled.includes(req.user._id)) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        // Add user to course's enrolled students
        course.studentsEnrolled.push(req.user._id);
        await course.save();

        // Add course to user's enrolled courses using $addToSet to avoid duplicates
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { enrolledCourses: course._id }
        });

        res.json({ success: true, message: 'Enrolled successfully' });
    } catch (error) {
        console.error("Enrollment Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Get all course progress for the logged in user
// @route   GET /api/courses/my-progress
// @access  Private
router.get('/my-progress', protect, async (req, res) => {
    try {
        const progressList = await CourseProgress.find({ user: req.user._id });
        res.json({ success: true, data: progressList });
    } catch (error) {
        console.error("Get All Progress Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Get course progress
// @route   GET /api/courses/:id/progress
// @access  Private
router.get('/:id/progress', protect, async (req, res) => {
    try {
        console.log(`Fetching progress for user ${req.user._id} course ${req.params.id}`);
        const progress = await CourseProgress.findOne({
            user: req.user._id,
            course: req.params.id
        });

        if (!progress) {
            console.log("No progress found");
            return res.json({
                success: true,
                data: {
                    completedLessons: [],
                    lastAccessedLessonId: null,
                    isCompleted: false
                }
            });
        }
        console.log("Progress found:", progress);
        res.json({ success: true, data: progress });
    } catch (error) {
        console.error("Get Progress Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Update course progress
// @route   POST /api/courses/:id/progress
// @access  Private
router.post('/:id/progress', protect, async (req, res) => {
    try {
        const { lessonId, completed } = req.body;
        const courseId = req.params.id;
        const userId = req.user._id;

        console.log(`Updating progress: User ${userId}, Course ${courseId}, Lesson ${lessonId}, Completed ${completed}`);

        let progress = await CourseProgress.findOne({ user: userId, course: courseId });

        if (!progress) {
            console.log("Creating new progress record");
            progress = new CourseProgress({
                user: userId,
                course: courseId,
                completedLessons: [],
                lastAccessedLessonId: lessonId
            });
        }

        // Update last accessed
        if (lessonId) {
            progress.lastAccessedLessonId = lessonId;
        }

        // Mark lesson as completed if requested
        if (completed && lessonId) {
            if (!progress.completedLessons.includes(lessonId)) {
                progress.completedLessons.push(lessonId);
            }
        }

        await progress.save();
        console.log("Progress saved:", progress);

        res.json({ success: true, data: progress });
    } catch (error) {
        console.error("Update Progress Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Mark course as completed
// @route   POST /api/courses/:id/complete
// @access  Private
router.post('/:id/complete', protect, async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.user._id;

        let progress = await CourseProgress.findOne({ user: userId, course: courseId });

        if (!progress) {
            // Should usually exist if they are completing it, but just in case
            progress = new CourseProgress({
                user: userId,
                course: courseId,
                completedLessons: [],
                isCompleted: true,
                completedAt: new Date()
            });
        } else {
            progress.isCompleted = true;
            progress.completedAt = new Date();
        }

        await progress.save();

        // Also update User's enrolled courses list if we want to track completion there too
        // For now, let's keep it in CourseProgress to be clean. 
        // But maybe the Course model has 'completedStudents' array? Yes it does.
        await Course.findByIdAndUpdate(courseId, {
            $addToSet: { completedStudents: userId }
        });

        res.json({ success: true, message: 'Course marked as completed' });
    } catch (error) {
        console.error("Complete Course Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
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

module.exports = router;
