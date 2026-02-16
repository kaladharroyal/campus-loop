const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    maxGrade: {
        type: Number,
        default: 100
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active'
    },
    // Quiz & Type Fields
    type: {
        type: String,
        enum: ['assignment', 'quiz'],
        default: 'assignment'
    },
    duration: {
        type: Number, // In minutes
        default: 0
    },
    questions: [{
        questionText: { type: String, required: true },
        options: [{
            text: { type: String, required: true },
            isCorrect: { type: Boolean, default: false }
        }],
        marks: { type: Number, default: 1 }
    }]
}, { timestamps: true });

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
