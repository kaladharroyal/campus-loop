const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thumbnail: {
        type: String, // URL to image
        default: 'https://via.placeholder.com/300x200?text=Course+Thumbnail'
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    completedStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    category: {
        type: String,
        required: true
    },
    duration: {
        type: String, // e.g., "10 weeks"
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    videoLink: {
        type: String,
        default: ''
    },
    curriculum: [{
        moduleTitle: { type: String, required: true },
        topics: [{
            title: { type: String, required: true },
            time: { type: Number, default: 0 } // Timestamp in seconds
        }],
        duration: { type: String }
    }]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
