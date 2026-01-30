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
        enum: ['student', 'teacher', 'teacher', 'admin'],
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
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', ''],
        default: ''
    },
    dob: {
        type: Date,
        default: null
    },
    // Current Education Details
    currentEducation: {
        institution: { type: String, default: '' },
        currentSemester: { type: String, default: '' },
        department: { type: String, default: '' },
        rollNo: { type: String, default: '' },
        passoutBatch: { type: String, default: '' },
        specialization: { type: String, default: '' },
        semesterScores: [{
            semester: { type: Number },
            cgpa: { type: String, default: '' },
            sgpa: { type: String, default: '' },
            ongoingBacklogs: { type: String, default: '-' },
            totalBacklogs: { type: String, default: '-' },
            document: { type: String, default: '' }
        }],
        marksheet: { type: String, default: '' }
    },
    // Previous Education Details
    previousEducation: {
        classXII: {
            schoolName: { type: String, default: '' },
            board: { type: String, default: '' },
            program: { type: String, default: 'Class XII' },
            startYear: { type: String, default: '' },
            endYear: { type: String, default: '' },
            educationType: { type: String, default: '' },
            percentage: { type: String, default: '' },
            cgpa: { type: String, default: '' },
            totalCgpa: { type: String, default: '' },
            notes: { type: String, default: '' }
        },
        classX: {
            schoolName: { type: String, default: '' },
            board: { type: String, default: '' },
            program: { type: String, default: 'Class X' },
            startYear: { type: String, default: '' },
            endYear: { type: String, default: '' },
            educationType: { type: String, default: '' },
            percentage: { type: String, default: '' },
            cgpa: { type: String, default: '' },
            totalCgpa: { type: String, default: '' },
            notes: { type: String, default: '' }
        }
    },
    socialLinks: {
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        twitter: { type: String, default: '' },
        instagram: { type: String, default: '' },
        website: { type: String, default: '' },
        leetcode: { type: String, default: '' }
    },
    resume: {
        type: String, // URL to the uploaded resume
        default: ''
    },
    skills: [{
        name: { type: String, required: true },
        level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Beginner' }
    }],
    workExperience: [{
        organization: { type: String, required: true },
        role: { type: String, required: true },
        employmentType: { type: String, default: '' },
        industry: { type: String, default: '' },
        location: { type: String, default: '' },
        skills: { type: String, default: '' }, // Keeping simple as string for now based on screenshot input
        startDate: { type: Date },
        endDate: { type: Date },
        currentlyWorking: { type: Boolean, default: false },
        description: { type: String, default: '' }
    }],
    hasNoWorkExperience: { type: Boolean, default: false },
    projects: [{
        name: { type: String, required: true },
        domain: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date },
        currentlyWorking: { type: Boolean, default: false },
        skills: { type: String, default: '' },
        description: { type: String, default: '' },
        link: { type: String, default: '' },
        completionLevel: { type: Number, default: 0 }
    }],
    hasNoProjects: { type: Boolean, default: false },
    isAvailableForMentoring: { type: Boolean, default: false },
    achievements: [{
        title: { type: String, required: true },
        issuer: { type: String, required: true },
        issueDate: { type: Date },
        description: { type: String, default: '' }
    }],
    hasNoAchievements: { type: Boolean, default: false },
    competitions: [{
        title: { type: String, required: true },
        hostedBy: { type: String, required: true },
        eventDate: { type: Date },
        mode: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
        outcome: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    hasNoCompetitions: { type: Boolean, default: false },
    events: [{
        title: { type: String, required: true },
        conductedOn: { type: Date },
        organizer: { type: String, required: true },
        skillsAcquired: { type: String, default: '' },
        type: { type: String, default: '' },
        mode: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
        location: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    hasNoEvents: { type: Boolean, default: false },
    certifications: [{
        title: { type: String, required: true },
        issuer: { type: String, required: true },
        issueDate: { type: Date, required: true },
        expiryDate: { type: Date },
        doesNotExpire: { type: Boolean, default: false },
        mode: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
        credentialUrl: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    hasNoCertifications: { type: Boolean, default: false },
    publications: [{
        title: { type: String, required: true },
        publisher: { type: String, required: true },
        publishDate: { type: Date },
        link: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    hasNoPublications: { type: Boolean, default: false },
    languages: [{
        language: { type: String, required: true },
        level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'], required: true }
    }],
    interests: [{ type: String }],
    // Course Relationships
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    createdCourses: [{ // For teachers/teachers
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    // Extended Contact Details
    secondaryEmail: { type: String, default: '' },
    alternatePhone: { type: String, default: '' },
    permanentAddress: { type: String, default: '' },
    currentAddress: { type: String, default: '' },
    parentDetails: {
        fatherName: { type: String, default: '' },
        fatherOccupation: { type: String, default: '' },
        motherName: { type: String, default: '' },
        motherOccupation: { type: String, default: '' },
        parentPhone: { type: String, default: '' },
        parentEmail: { type: String, default: '' }
    },
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
