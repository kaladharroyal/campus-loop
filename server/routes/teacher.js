const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const User = require('../models/User');
const CourseProgress = require('../models/CourseProgress');
const { protect } = require('../middleware/authMiddleware');
const teacherOnly = require('../middleware/teacherOnly');

// Apply middleware to all routes
router.use(protect);
router.use(teacherOnly);

// ============================================
// COURSE MANAGEMENT ROUTES
// ============================================

// @route   POST /api/teacher/course
// @desc    Create a new course
// @access  Teacher only
router.post('/course', async (req, res) => {
    try {
        const { title, description, category, level, duration, thumbnail, videoLink, curriculum, status } = req.body;

        const course = await Course.create({
            title,
            description,
            category,
            level,
            duration,
            thumbnail,
            videoLink,
            curriculum,
            status: status || 'draft',
            teacher: req.user._id
        });

        // Add to teacher's createdCourses
        await User.findByIdAndUpdate(req.user._id, {
            $push: { createdCourses: course._id }
        });

        res.status(201).json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/teacher/courses
// @desc    Get all courses created by the teacher
// @access  Teacher only
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({ teacher: req.user._id })
            .sort({ createdAt: -1 })
            .populate('studentsEnrolled', 'firstName lastName email')
            .populate('completedStudents', 'firstName lastName');

        const coursesWithStats = courses.map(course => ({
            ...course.toObject(),
            enrolledCount: course.studentsEnrolled.length,
            completedCount: course.completedStudents.length
        }));

        res.json({
            success: true,
            count: courses.length,
            data: coursesWithStats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/teacher/course/:id
// @desc    Get single course with full details
// @access  Teacher only
router.get('/course/:id', async (req, res) => {
    try {
        const course = await Course.findOne({
            _id: req.params.id,
            teacher: req.user._id
        })
            .populate('studentsEnrolled', 'firstName lastName email')
            .populate('completedStudents', 'firstName lastName email');

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
            message: error.message
        });
    }
});

// @route   PUT /api/teacher/course/:id
// @desc    Update course
// @access  Teacher only
router.put('/course/:id', async (req, res) => {
    try {
        let course = await Course.findOne({
            _id: req.params.id,
            teacher: req.user._id
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   DELETE /api/teacher/course/:id
// @desc    Delete course
// @access  Teacher only
router.delete('/course/:id', async (req, res) => {
    try {
        const course = await Course.findOne({
            _id: req.params.id,
            teacher: req.user._id
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Remove course from enrolled students
        await User.updateMany(
            { enrolledCourses: course._id },
            { $pull: { enrolledCourses: course._id } }
        );

        // Remove course from teacher's createdCourses
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { createdCourses: course._id }
        });

        // Delete related assignments and submissions
        const assignments = await Assignment.find({ course: course._id });
        const assignmentIds = assignments.map(a => a._id);
        await Submission.deleteMany({ assignment: { $in: assignmentIds } });
        await Assignment.deleteMany({ course: course._id });

        await Course.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/teacher/course/:id/students
// @desc    Get enrolled students for a course
// @access  Teacher only
router.get('/course/:id/students', async (req, res) => {
    try {
        const course = await Course.findOne({
            _id: req.params.id,
            teacher: req.user._id
        }).populate('studentsEnrolled', 'firstName lastName email enrolledCourses')
            .populate('completedStudents', '_id');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const studentsWithProgress = await Promise.all(course.studentsEnrolled.map(async (student) => {
            const progressDoc = await CourseProgress.findOne({
                user: student._id,
                course: course._id
            });

            // Calculate percentage
            let progressPercentage = 0;
            // Determine total lessons (same logic as player/course model)
            // Flatten curriculum to count topics
            let totalLessons = 0;
            if (course.curriculum) {
                course.curriculum.forEach(module => {
                    if (module.topics) totalLessons += module.topics.length;
                });
            }
            if (totalLessons === 0) totalLessons = 1; // Avoid divide by zero if empty course

            if (progressDoc) {
                if (progressDoc.isCompleted) {
                    progressPercentage = 100;
                } else if (progressDoc.completedLessons) {
                    progressPercentage = Math.round((progressDoc.completedLessons.length / totalLessons) * 100);
                }
            }

            return {
                _id: student._id,
                name: `${student.firstName} ${student.lastName}`,
                email: student.email,
                progress: progressPercentage,
                status: progressPercentage === 100 ? 'Completed' : (progressPercentage > 0 ? 'In Progress' : 'Not Started')
            };
        }));

        res.json({
            success: true,
            course: {
                title: course.title,
                enrolledCount: course.studentsEnrolled.length
            },
            data: studentsWithProgress
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ============================================
// ASSIGNMENT MANAGEMENT ROUTES
// ============================================

// @route   POST /api/teacher/assignment
// @desc    Create a new assignment
// @access  Teacher only
router.post('/assignment', async (req, res) => {
    try {
        const { title, description, course, dueDate, maxGrade } = req.body;

        // Verify course belongs to teacher
        const courseDoc = await Course.findOne({
            _id: course,
            teacher: req.user._id
        });

        if (!courseDoc) {
            return res.status(404).json({
                success: false,
                message: 'Course not found or access denied'
            });
        }

        const assignment = await Assignment.create({
            title,
            description,
            course,
            teacher: req.user._id,
            dueDate,
            maxGrade: maxGrade || 100
        });

        res.status(201).json({
            success: true,
            data: assignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/teacher/assignments
// @desc    Get all assignments created by teacher
// @access  Teacher only
router.get('/assignments', async (req, res) => {
    try {
        const assignments = await Assignment.find({ teacher: req.user._id })
            .populate('course', 'title')
            .sort({ createdAt: -1 });

        // Get submission counts for each assignment
        const assignmentsWithStats = await Promise.all(
            assignments.map(async (assignment) => {
                const totalSubmissions = await Submission.countDocuments({
                    assignment: assignment._id
                });
                const gradedSubmissions = await Submission.countDocuments({
                    assignment: assignment._id,
                    status: 'graded'
                });
                const pendingSubmissions = totalSubmissions - gradedSubmissions;

                return {
                    ...assignment.toObject(),
                    totalSubmissions,
                    gradedSubmissions,
                    pendingSubmissions
                };
            })
        );

        res.json({
            success: true,
            count: assignments.length,
            data: assignmentsWithStats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/teacher/assignment/:id
// @desc    Get assignment details with submissions
// @access  Teacher only
router.get('/assignment/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findOne({
            _id: req.params.id,
            teacher: req.user._id
        }).populate('course', 'title');

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Assignment not found'
            });
        }

        const submissions = await Submission.find({ assignment: assignment._id })
            .populate('student', 'firstName lastName email')
            .sort({ submittedAt: -1 });

        res.json({
            success: true,
            data: {
                assignment,
                submissions
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   PUT /api/teacher/assignment/:id
// @desc    Update assignment
// @access  Teacher only
router.put('/assignment/:id', async (req, res) => {
    try {
        let assignment = await Assignment.findOne({
            _id: req.params.id,
            teacher: req.user._id
        });

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Assignment not found'
            });
        }

        assignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: assignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   DELETE /api/teacher/assignment/:id
// @desc    Delete assignment
// @access  Teacher only
router.delete('/assignment/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findOne({
            _id: req.params.id,
            teacher: req.user._id
        });

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Assignment not found'
            });
        }

        // Delete all submissions for this assignment
        await Submission.deleteMany({ assignment: assignment._id });

        await Assignment.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Assignment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   PUT /api/teacher/assignment/submission/:id/grade
// @desc    Grade a submission
// @access  Teacher only
router.put('/assignment/submission/:id/grade', async (req, res) => {
    try {
        const { grade, feedback } = req.body;

        const submission = await Submission.findById(req.params.id)
            .populate('assignment', 'teacher');

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            });
        }

        // Verify assignment belongs to teacher
        if (submission.assignment.teacher.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        submission.grade = grade;
        submission.feedback = feedback || '';
        submission.status = 'graded';
        await submission.save();

        res.json({
            success: true,
            data: submission
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ============================================
// ANALYTICS ROUTES
// ============================================

// @route   GET /api/teacher/analytics
// @desc    Get teacher analytics
// @access  Teacher only
router.get('/analytics', async (req, res) => {
    try {
        // Get all teacher's courses
        const courses = await Course.find({ teacher: req.user._id })
            .populate('studentsEnrolled')
            .populate('completedStudents');

        // Calculate stats
        const totalCourses = courses.length;
        const publishedCourses = courses.filter(c => c.status === 'published').length;
        const draftCourses = totalCourses - publishedCourses;

        let totalStudents = 0;
        const studentSet = new Set();
        courses.forEach(course => {
            course.studentsEnrolled.forEach(student => {
                studentSet.add(student._id.toString());
            });
        });
        totalStudents = studentSet.size;

        const totalCompleted = courses.reduce((sum, course) =>
            sum + course.completedStudents.length, 0
        );

        // Course-wise enrollment
        const courseEnrollment = courses.map(course => ({
            name: course.title.substring(0, 20),
            enrolled: course.studentsEnrolled.length,
            completed: course.completedStudents.length
        }));

        // Assignment stats
        const assignments = await Assignment.find({ teacher: req.user._id });
        const totalAssignments = assignments.length;

        const allSubmissions = await Submission.find({
            assignment: { $in: assignments.map(a => a._id) }
        });

        const submissionStats = {
            total: allSubmissions.length,
            graded: allSubmissions.filter(s => s.status === 'graded').length,
            pending: allSubmissions.filter(s => s.status === 'submitted').length,
            late: allSubmissions.filter(s => s.status === 'late').length
        };

        // Recent enrollments (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentEnrollments = courses.flatMap(course => {
            if (!course.studentsEnrolled || !Array.isArray(course.studentsEnrolled)) return [];

            return course.studentsEnrolled
                .filter(student => student && student.createdAt && student.createdAt > sevenDaysAgo)
                .map(student => ({
                    studentName: `${student.firstName} ${student.lastName}`,
                    courseName: course.title,
                    enrolledAt: student.createdAt
                }));
        }).slice(0, 10);

        res.json({
            success: true,
            data: {
                overview: {
                    totalCourses,
                    publishedCourses,
                    draftCourses,
                    totalStudents,
                    totalCompleted,
                    totalAssignments
                },
                courseEnrollment,
                submissionStats,
                recentEnrollments
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ============================================
// PROFILE ROUTES
// ============================================

// @route   PUT /api/teacher/profile
// @desc    Update teacher profile
// @access  Teacher only
router.put('/profile', async (req, res) => {
    try {
        const allowedFields = [
            'firstName', 'lastName', 'email', 'phone', 'bio',
            'profilePicture', 'skills', 'socialLinks'
        ];

        const updates = {};
        Object.keys(req.body).forEach(key => {
            if (allowedFields.includes(key)) {
                updates[key] = req.body[key];
            }
        });

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
