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

// @desc    Get student performance report
// @route   GET /api/reports/student-performance
// @access  Admin only
router.get('/student-performance', async (req, res) => {
    try {
        const students = await User.find({ role: 'student' })
            .select('firstName lastName email branch year')
            .lean();

        const performanceData = await Promise.all(
            students.map(async (student) => {
                // Get student's assignments
                const assignments = await Assignment.find({})
                    .populate('course', 'name')
                    .lean();

                // Calculate average grade (placeholder - you may need to adjust based on your submission model)
                const totalAssignments = assignments.length;
                const averageGrade = totalAssignments > 0 ? 85 : 0; // Placeholder calculation

                // Get attendance rate
                const attendanceRecords = await Attendance.find({
                    student: student._id
                }).lean();

                const attendanceRate = attendanceRecords.length > 0
                    ? (attendanceRecords.filter(a => a.status === 'present').length / attendanceRecords.length * 100).toFixed(2)
                    : 0;

                return {
                    studentId: student._id,
                    name: `${student.firstName} ${student.lastName}`,
                    email: student.email,
                    branch: student.branch || 'N/A',
                    year: student.year || 'N/A',
                    averageGrade: averageGrade,
                    attendanceRate: attendanceRate,
                    totalAssignments: totalAssignments,
                    completedAssignments: Math.floor(totalAssignments * 0.8) // Placeholder
                };
            })
        );

        res.json({
            success: true,
            reportType: 'Student Performance Report',
            generatedAt: new Date(),
            totalStudents: students.length,
            data: performanceData
        });
    } catch (error) {
        console.error('Student Performance Report Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get course analytics report
// @route   GET /api/reports/course-analytics
// @access  Admin only
router.get('/course-analytics', async (req, res) => {
    try {
        const courses = await Course.find({})
            .populate('teacher', 'firstName lastName')
            .lean();

        const courseAnalytics = await Promise.all(
            courses.map(async (course) => {
                // Count enrolled students (you may need to adjust based on your enrollment model)
                const enrollmentCount = 0; // Placeholder - adjust based on your enrollment logic

                // Count assignments for this course
                const assignmentCount = await Assignment.countDocuments({
                    course: course._id
                });

                // Calculate average completion rate (placeholder)
                const completionRate = 75; // Placeholder

                return {
                    courseId: course._id,
                    courseName: course.name,
                    courseCode: course.code,
                    teacher: course.teacher
                        ? `${course.teacher.firstName} ${course.teacher.lastName}`
                        : 'Unassigned',
                    enrolledStudents: enrollmentCount,
                    totalAssignments: assignmentCount,
                    completionRate: completionRate,
                    credits: course.credits || 0
                };
            })
        );

        res.json({
            success: true,
            reportType: 'Course Analytics Report',
            generatedAt: new Date(),
            totalCourses: courses.length,
            data: courseAnalytics
        });
    } catch (error) {
        console.error('Course Analytics Report Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get attendance analytics report
// @route   GET /api/reports/attendance-analytics
// @access  Admin only
router.get('/attendance-analytics', async (req, res) => {
    try {
        const students = await User.find({ role: 'student' })
            .select('firstName lastName email branch year')
            .lean();

        const attendanceAnalytics = await Promise.all(
            students.map(async (student) => {
                const attendanceRecords = await Attendance.find({
                    student: student._id
                }).populate('course', 'name').lean();

                const totalClasses = attendanceRecords.length;
                const presentCount = attendanceRecords.filter(a => a.status === 'present').length;
                const absentCount = attendanceRecords.filter(a => a.status === 'absent').length;
                const attendanceRate = totalClasses > 0
                    ? ((presentCount / totalClasses) * 100).toFixed(2)
                    : 0;

                return {
                    studentId: student._id,
                    name: `${student.firstName} ${student.lastName}`,
                    email: student.email,
                    branch: student.branch || 'N/A',
                    year: student.year || 'N/A',
                    totalClasses: totalClasses,
                    present: presentCount,
                    absent: absentCount,
                    attendanceRate: attendanceRate
                };
            })
        );

        // Calculate overall statistics
        const totalClasses = attendanceAnalytics.reduce((sum, s) => sum + s.totalClasses, 0);
        const totalPresent = attendanceAnalytics.reduce((sum, s) => sum + s.present, 0);
        const overallAttendanceRate = totalClasses > 0
            ? ((totalPresent / totalClasses) * 100).toFixed(2)
            : 0;

        res.json({
            success: true,
            reportType: 'Attendance Analytics Report',
            generatedAt: new Date(),
            totalStudents: students.length,
            overallAttendanceRate: overallAttendanceRate,
            data: attendanceAnalytics
        });
    } catch (error) {
        console.error('Attendance Analytics Report Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get assignment analytics report
// @route   GET /api/reports/assignment-analytics
// @access  Admin only
router.get('/assignment-analytics', async (req, res) => {
    try {
        const assignments = await Assignment.find({})
            .populate('course', 'name code')
            .lean();

        const assignmentAnalytics = assignments.map((assignment) => {
            // Placeholder submission data - adjust based on your submission model
            const totalSubmissions = 0;
            const onTimeSubmissions = 0;
            const lateSubmissions = 0;
            const submissionRate = 0;

            return {
                assignmentId: assignment._id,
                title: assignment.title,
                course: assignment.course ? assignment.course.name : 'N/A',
                courseCode: assignment.course ? assignment.course.code : 'N/A',
                dueDate: assignment.dueDate,
                totalPoints: assignment.totalPoints || 0,
                totalSubmissions: totalSubmissions,
                onTimeSubmissions: onTimeSubmissions,
                lateSubmissions: lateSubmissions,
                submissionRate: submissionRate,
                averageGrade: 0 // Placeholder
            };
        });

        res.json({
            success: true,
            reportType: 'Assignment Analytics Report',
            generatedAt: new Date(),
            totalAssignments: assignments.length,
            data: assignmentAnalytics
        });
    } catch (error) {
        console.error('Assignment Analytics Report Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get teacher workload report
// @route   GET /api/reports/teacher-workload
// @access  Admin only
router.get('/teacher-workload', async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' })
            .select('firstName lastName email branch')
            .lean();

        const workloadData = await Promise.all(
            teachers.map(async (teacher) => {
                // Get courses taught by this teacher
                const courses = await Course.find({ teacher: teacher._id })
                    .select('name code credits')
                    .lean();

                // Get total assignments created
                const totalAssignments = await Assignment.countDocuments({
                    course: { $in: courses.map(c => c._id) }
                });

                // Calculate total credits
                const totalCredits = courses.reduce((sum, course) => sum + (course.credits || 0), 0);

                return {
                    teacherId: teacher._id,
                    name: `${teacher.firstName} ${teacher.lastName}`,
                    email: teacher.email,
                    branch: teacher.branch || 'N/A',
                    totalCourses: courses.length,
                    totalCredits: totalCredits,
                    totalAssignments: totalAssignments,
                    courses: courses.map(c => ({
                        name: c.name,
                        code: c.code,
                        credits: c.credits || 0
                    }))
                };
            })
        );

        res.json({
            success: true,
            reportType: 'Faculty Workload Report',
            generatedAt: new Date(),
            totalTeachers: teachers.length,
            data: workloadData
        });
    } catch (error) {
        console.error('Teacher Workload Report Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get monthly summary report
// @route   GET /api/reports/monthly-summary
// @access  Admin only
router.get('/monthly-summary', async (req, res) => {
    try {
        // Get current month date range
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        // Get counts
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalTeachers = await User.countDocuments({ role: 'teacher' });
        const totalCourses = await Course.countDocuments();
        const totalAssignments = await Assignment.countDocuments();

        // Get new registrations this month
        const newStudents = await User.countDocuments({
            role: 'student',
            createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
        });

        const newTeachers = await User.countDocuments({
            role: 'teacher',
            createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
        });

        // Get attendance statistics for this month
        const monthlyAttendance = await Attendance.find({
            date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
        }).lean();

        const totalAttendanceRecords = monthlyAttendance.length;
        const presentCount = monthlyAttendance.filter(a => a.status === 'present').length;
        const monthlyAttendanceRate = totalAttendanceRecords > 0
            ? ((presentCount / totalAttendanceRecords) * 100).toFixed(2)
            : 0;

        // Get assignments due this month
        const assignmentsDueThisMonth = await Assignment.countDocuments({
            dueDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
        });

        res.json({
            success: true,
            reportType: 'Monthly Summary Report',
            generatedAt: new Date(),
            reportPeriod: {
                month: now.toLocaleString('default', { month: 'long' }),
                year: now.getFullYear(),
                startDate: firstDayOfMonth,
                endDate: lastDayOfMonth
            },
            data: {
                userStatistics: {
                    totalStudents,
                    totalTeachers,
                    newStudents,
                    newTeachers
                },
                academicStatistics: {
                    totalCourses,
                    totalAssignments,
                    assignmentsDueThisMonth
                },
                attendanceStatistics: {
                    totalRecords: totalAttendanceRecords,
                    presentCount,
                    absentCount: totalAttendanceRecords - presentCount,
                    attendanceRate: monthlyAttendanceRate
                }
            }
        });
    } catch (error) {
        console.error('Monthly Summary Report Error:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
