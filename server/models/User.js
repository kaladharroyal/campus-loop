const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'teacher', 'admin'], // Support both teacher and instructor
        default: 'student'
    },
    branch: { type: String, default: '' },
    year: { type: String, default: '' },
    phone: { type: String, default: '' },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    // Extended Profile Fields
    profilePicture: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    socialLinks: {
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        website: { type: String, default: '' }
    },
    // Course Relationships
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    createdCourses: [{ // For instructors/teachers
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    // Password Reset
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
