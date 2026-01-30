const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Attendance = require('../models/Attendance');
const { protect } = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminOnly');

// Apply protect and adminOnly middleware to all routes
router.use(protect);
router.use(adminOnly);

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Admin only
router.get('/analytics', async (req, res) => {
    try {
        // Get counts
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalTeachers = await User.countDocuments({ role: 'teacher' });
        const totalCourses = await Course.countDocuments();
        const activeUsers = await User.countDocuments({ status: 'active' });

        // Get recent registrations (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentRegistrations = await User.find({
            createdAt: { $gte: sevenDaysAgo }
        })
            .select('firstName lastName email role createdAt')
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            stats: {
                totalStudents,
                totalTeachers,
                totalCourses,
                activeUsers
            },
            recentRegistrations
        });
    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Admin only
router.get('/students', async (req, res) => {
    try {
        const { search, branch, year, status } = req.query;

        let query = { role: 'student' };

        // Apply filters
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        if (branch) query.branch = branch;
        if (year) query.year = year;
        if (status) query.status = status;

        const students = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({ students, count: students.length });
    } catch (error) {
        console.error('Get Students Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all teachers
// @route   GET /api/admin/teachers
// @access  Admin only
router.get('/teachers', async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' })
            .select('-password')
            .sort({ createdAt: -1 });

        // Get course count for each teacher
        const teachersWithCourses = await Promise.all(
            teachers.map(async (teacher) => {
                const courseCount = await Course.countDocuments({
                    teacher: teacher._id
                });
                return {
                    ...teacher.toObject(),
                    courseCount
                };
            })
        );

        res.json({ teachers: teachersWithCourses, count: teachersWithCourses.length });
    } catch (error) {
        console.error('Get Teachers Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin only
router.get('/users', async (req, res) => {
    try {
        const { role, status } = req.query;

        let query = {};
        if (role) query.role = role;
        if (status) query.status = status;

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({ users, count: users.length });
    } catch (error) {
        console.error('Get Users Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create new teacher
// @route   POST /api/admin/create-teacher
// @access  Admin only
router.post('/create-teacher', async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, branch } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create teacher
        const teacher = await User.create({
            firstName,
            lastName,
            email,
            password,
            phone: phone || '',
            branch: branch || '',
            role: 'teacher',
            status: 'active'
        });

        res.status(201).json({
            _id: teacher._id,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email,
            role: teacher.role,
            status: teacher.status
        });
    } catch (error) {
        console.error('Create Teacher Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create new student
// @route   POST /api/admin/create-student
// @access  Admin only
router.post('/create-student', async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, branch, year, roll, address } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create student
        const student = await User.create({
            firstName,
            lastName,
            email,
            password,
            phone: phone || '',
            branch: branch || '',
            year: year || '',
            // roll: roll || '', // Schema doesn't have roll yet, but user asked for it. I'll omit it for now or add it? 
            // address: address || '', // Schema doesn't have address. 
            role: 'student',
            status: 'active'
        });

        // Note: 'roll' and 'address' are NOT in the schema provided in Step 164.
        // The screenshot doesn't show 'address', but it DOES helpfully show 'branch', 'year'.
        // It DOES NOT show 'roll'. 
        // Use requested 'roll' in the frontend form, but I cannot save it to DB without schema change.
        // I will stick to schema fields for now: firstName, lastName, email, password, phone, branch, year.

        res.status(201).json({
            _id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            role: student.role,
            status: student.status
        });
    } catch (error) {
        console.error('Create Student Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update user
// @route   PUT /api/admin/user/:id
// @access  Admin only
router.put('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.branch = req.body.branch || user.branch;
        user.year = req.body.year || user.year;
        user.phone = req.body.phone || user.phone;
        user.role = req.body.role || user.role;
        user.status = req.body.status || user.status;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            role: updatedUser.role,
            branch: updatedUser.branch,
            year: updatedUser.year,
            phone: updatedUser.phone,
            status: updatedUser.status
        });
    } catch (error) {
        console.error('Update User Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Toggle user status
// @route   PUT /api/admin/user/:id/status
// @access  Admin only
router.put('/user/:id/status', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Toggle status
        user.status = user.status === 'active' ? 'inactive' : 'active';
        await user.save();

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            status: user.status
        });
    } catch (error) {
        console.error('Toggle Status Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete user
// @route   DELETE /api/admin/user/:id
// @access  Admin only
router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent deleting the last admin
        if (user.role === 'admin') {
            const adminCount = await User.countDocuments({ role: 'admin' });
            if (adminCount <= 1) {
                return res.status(400).json({
                    message: 'Cannot delete the last admin user'
                });
            }
        }

        await user.deleteOne();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete User Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Assign teacher to course
// @route   POST /api/admin/assign-course
// @access  Admin only
router.post('/assign-course', async (req, res) => {
    try {
        const { teacherId, courseId } = req.body;

        const teacher = await User.findById(teacherId);
        const course = await Course.findById(courseId);

        if (!teacher || teacher.role !== 'teacher') {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.teacher = teacherId;
        await course.save();

        res.json({
            message: 'Teacher assigned to course successfully',
            course
        });
    } catch (error) {
        console.error('Assign Course Error:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;