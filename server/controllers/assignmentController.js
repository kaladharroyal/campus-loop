const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const Course = require('../models/Course');
const mongoose = require('mongoose');

// @desc    Create a new assignment or quiz
// @route   POST /api/assignments
// @access  Private (Teacher/Admin)
const createAssignment = async (req, res) => {
    try {
        const { title, description, course, dueDate, maxGrade, type, questions, duration } = req.body;

        // Validation
        if (!title || !description || !course || !dueDate) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (type === 'quiz' && (!questions || questions.length === 0)) {
            return res.status(400).json({ message: 'Quizzes must have at least one question' });
        }

        const assignment = await Assignment.create({
            title,
            description,
            course,
            teacher: req.user._id,
            dueDate,
            maxGrade,
            type: type || 'assignment',
            questions: type === 'quiz' ? questions : [],
            duration: type === 'quiz' ? duration : 0
        });

        res.status(201).json(assignment);
    } catch (error) {
        console.error("Create Assignment Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get assignments for a course (or all if no courseId)
// @route   GET /api/assignments?courseId=...
// @access  Private
const getAssignments = async (req, res) => {
    try {
        const { courseId } = req.query;
        let query = {};

        if (courseId) {
            query.course = courseId;
        }

        // If student, maybe filter active only? For now return all.
        const assignments = await Assignment.find(query)
            .populate('teacher', 'firstName lastName')
            .sort({ dueDate: 1 });

        res.json(assignments);
    } catch (error) {
        console.error("Get Assignments Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single assignment by ID
// @route   GET /api/assignments/:id
// @access  Private
const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id).populate('teacher', 'firstName lastName');
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.json(assignment);
    } catch (error) {
        console.error("Get Assignment Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit an assignment or quiz
// @route   POST /api/assignments/:id/submit
// @access  Private (Student)
// @desc    Submit an assignment or quiz
// @route   POST /api/assignments/:id/submit
// @access  Private (Student)
const submitAssignment = async (req, res) => {
    try {
        console.log("Submit Assignment Request received");
        console.log("Headers content-type:", req.headers['content-type']);
        console.log("req.body type:", typeof req.body);
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);

        if (!req.body) {
            console.log("req.body is explicitly undefined!");
            // This is a hack, but let's see if we can just define it if missing
            req.body = {};
        }

        const { submissionText, quizAnswers } = req.body;
        const assignmentId = req.params.id;
        const studentId = req.user._id;

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // Check for existing submission
        const existingSubmission = await Submission.findOne({ assignment: assignmentId, student: studentId });
        if (existingSubmission) {
            return res.status(400).json({ message: 'You have already submitted this assignment' });
        }

        let score = 0;
        let grade = '';
        let status = 'submitted';

        // Auto-grading for Quizzes
        if (assignment.type === 'quiz') {
            if (!quizAnswers) {
                return res.status(400).json({ message: 'Quiz answers are required' });
            }

            // Parse quizAnswers if it's a string (multipart/form-data sends JSON as string)
            let parsedAnswers = quizAnswers;
            if (typeof quizAnswers === 'string') {
                try {
                    parsedAnswers = JSON.parse(quizAnswers);
                } catch (e) {
                    return res.status(400).json({ message: 'Invalid quiz answers format' });
                }
            }

            if (!Array.isArray(parsedAnswers)) {
                return res.status(400).json({ message: 'Quiz answers must be an array' });
            }

            // Calculate score
            assignment.questions.forEach(question => {
                const studentAnswer = parsedAnswers.find(ans =>
                    ans.questionId.toString() === question._id.toString()
                );

                if (studentAnswer) {
                    const correctOption = question.options.find(opt => opt.isCorrect);
                    if (correctOption && studentAnswer.selectedOptionId.toString() === correctOption._id.toString()) {
                        score += question.marks;
                    }
                }
            });

            grade = `${score}/${assignment.maxGrade}`; // Simple string grade for now
            status = 'graded';

            // Re-assign parsed answers for creation
            req.body.quizAnswers = parsedAnswers;
        }

        // Handle File Upload
        let attachments = [];
        if (req.file) {
            attachments.push({
                filename: req.file.originalname,
                url: `/uploads/${req.file.filename}` // Relative URL
            });
        }

        // Create Submission
        const submission = await Submission.create({
            assignment: assignmentId,
            student: studentId,
            submissionText: submissionText || '',
            attachments: attachments,
            quizAnswers: assignment.type === 'quiz' ? req.body.quizAnswers : [],
            score,
            grade,
            status
        });

        res.status(201).json(submission);

    } catch (error) {
        console.error("Submit Assignment Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getMySubmission = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const studentId = req.user._id;

        const submission = await Submission.findOne({
            assignment: assignmentId,
            student: studentId
        });

        if (!submission) {
            // Not found is not an error, just means no submission yet
            return res.json(null);
        }

        res.json(submission);
    } catch (error) {
        console.error("Get My Submission Error:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAssignment,
    getAssignments,
    getAssignmentById,
    submitAssignment,
    getMySubmission
};
