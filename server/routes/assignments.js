const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createAssignment,
    getAssignments,
    getAssignmentById,
    submitAssignment,
    getMySubmission
} = require('../controllers/assignmentController');

// @route   POST /api/assignments
// @desc    Create a new assignment or quiz
// @access  Private (Teacher)
router.post('/', protect, createAssignment);

// @route   GET /api/assignments
// @desc    Get all assignments (or filter by courseId)
// @access  Private
router.get('/', protect, getAssignments);

// @route   GET /api/assignments/:id
// @desc    Get assignment by ID
// @access  Private
router.get('/:id', protect, getAssignmentById);

// @route   POST /api/assignments/:id/submit
// @desc    Submit assignment / quiz
// @access  Private (Student)
const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        console.log("Multer filename generation. req.user:", req.user);
        const userId = req.user ? req.user._id : 'anonymous';
        cb(null, `${userId}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// File Filter (for example, allow only PDFs and Images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images and PDFs are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// @route   POST /api/assignments/:id/submit
// @desc    Submit assignment / quiz
// @access  Private (Student)
router.post('/:id/submit', protect, upload.single('file'), submitAssignment);

// @route   GET /api/assignments/:id/submission
// @desc    Get my submission for an assignment
// @access  Private (Student)
router.get('/:id/submission', protect, getMySubmission);

module.exports = router;
