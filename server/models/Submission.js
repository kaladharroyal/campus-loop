const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submissionText: {
        type: String,
        default: ''
    },
    attachments: [{
        filename: String,
        url: String
    }],
    submittedAt: {
        type: Date,
        default: Date.now
    },
    grade: {
        type: String,
        default: ''
    },
    feedback: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['submitted', 'late', 'graded'],
        default: 'submitted'
    }
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
