const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role, branch, year, phone } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            role,
            branch,
            year,
            phone
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                name: `${user.firstName} ${user.lastName}`, // Backward compat key
                email: user.email,
                bio: user.bio,
                gender: user.gender,
                dob: user.dob,
                secondaryEmail: user.secondaryEmail,
                alternatePhone: user.alternatePhone,
                permanentAddress: user.permanentAddress,
                currentAddress: user.currentAddress,
                parentDetails: user.parentDetails,
                role: user.role,
                branch: user.branch,
                year: user.year,
                phone: user.phone,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                name: `${user.firstName} ${user.lastName}`, // Backward compat key
                email: user.email,
                role: user.role,
                branch: user.branch,
                year: user.year,
                phone: user.phone,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const user = await User.findById(req.user._id);

        if (user) {
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.email = req.body.email || user.email;
            user.branch = req.body.branch || user.branch;
            user.year = req.body.year || user.year;
            user.phone = req.body.phone || user.phone;
            user.profilePicture = req.body.profilePicture || user.profilePicture;
            user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
            user.gender = req.body.gender !== undefined ? req.body.gender : user.gender;
            user.dob = req.body.dob !== undefined ? req.body.dob : user.dob;
            user.secondaryEmail = req.body.secondaryEmail !== undefined ? req.body.secondaryEmail : user.secondaryEmail;
            user.alternatePhone = req.body.alternatePhone !== undefined ? req.body.alternatePhone : user.alternatePhone;
            user.permanentAddress = req.body.permanentAddress !== undefined ? req.body.permanentAddress : user.permanentAddress;
            user.currentAddress = req.body.currentAddress !== undefined ? req.body.currentAddress : user.currentAddress;

            if (req.body.parentDetails) {
                user.parentDetails = {
                    ...user.parentDetails, // Spread existing to keep values if not in body
                    ...req.body.parentDetails
                };
            }

            if (req.body.currentEducation) {
                user.currentEducation = {
                    ...user.currentEducation,
                    ...req.body.currentEducation
                };
            }

            if (req.body.previousEducation) {
                user.previousEducation = {
                    ...user.previousEducation,
                    classXII: { ...user.previousEducation?.classXII, ...req.body.previousEducation.classXII },
                    classX: { ...user.previousEducation?.classX, ...req.body.previousEducation.classX }
                };
            }

            if (req.body.socialLinks) {
                // FIXED: Use spread to merge existing links with new links
                user.socialLinks = {
                    ...user.socialLinks,
                    ...req.body.socialLinks
                };
            }

            if (req.body.resume) user.resume = req.body.resume;
            if (req.body.skills) user.skills = req.body.skills;
            if (req.body.workExperience) user.workExperience = req.body.workExperience;
            if (req.body.hasNoWorkExperience !== undefined) user.hasNoWorkExperience = req.body.hasNoWorkExperience;
            if (req.body.projects) user.projects = req.body.projects;
            if (req.body.hasNoProjects !== undefined) user.hasNoProjects = req.body.hasNoProjects;
            if (req.body.isAvailableForMentoring !== undefined) user.isAvailableForMentoring = req.body.isAvailableForMentoring;
            if (req.body.achievements) user.achievements = req.body.achievements;
            if (req.body.hasNoAchievements !== undefined) user.hasNoAchievements = req.body.hasNoAchievements;
            if (req.body.competitions) user.competitions = req.body.competitions;
            if (req.body.hasNoCompetitions !== undefined) user.hasNoCompetitions = req.body.hasNoCompetitions;
            if (req.body.events) user.events = req.body.events;
            if (req.body.hasNoEvents !== undefined) user.hasNoEvents = req.body.hasNoEvents;
            if (req.body.certifications) user.certifications = req.body.certifications;
            if (req.body.hasNoCertifications !== undefined) user.hasNoCertifications = req.body.hasNoCertifications;
            if (req.body.publications) user.publications = req.body.publications;
            if (req.body.hasNoPublications !== undefined) user.hasNoPublications = req.body.hasNoPublications;
            if (req.body.languages) user.languages = req.body.languages;
            if (req.body.interests) user.interests = req.body.interests;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                name: `${updatedUser.firstName} ${updatedUser.lastName}`,
                email: updatedUser.email,
                role: updatedUser.role,
                branch: updatedUser.branch,
                year: updatedUser.year,
                phone: updatedUser.phone,
                profilePicture: updatedUser.profilePicture,
                bio: updatedUser.bio,
                gender: updatedUser.gender,
                dob: updatedUser.dob,
                secondaryEmail: updatedUser.secondaryEmail,
                alternatePhone: updatedUser.alternatePhone,
                permanentAddress: updatedUser.permanentAddress,
                currentAddress: updatedUser.currentAddress,
                parentDetails: updatedUser.parentDetails,
                currentEducation: updatedUser.currentEducation,
                previousEducation: updatedUser.previousEducation,
                socialLinks: updatedUser.socialLinks,
                resume: updatedUser.resume,
                skills: updatedUser.skills,
                workExperience: updatedUser.workExperience,
                hasNoWorkExperience: updatedUser.hasNoWorkExperience,
                projects: updatedUser.projects,
                hasNoProjects: updatedUser.hasNoProjects,
                isAvailableForMentoring: updatedUser.isAvailableForMentoring,
                achievements: updatedUser.achievements,
                hasNoAchievements: updatedUser.hasNoAchievements,
                competitions: updatedUser.competitions,
                hasNoCompetitions: updatedUser.hasNoCompetitions,
                events: updatedUser.events,
                hasNoEvents: updatedUser.hasNoEvents,
                certifications: updatedUser.certifications,
                hasNoCertifications: updatedUser.hasNoCertifications,
                publications: updatedUser.publications,
                hasNoPublications: updatedUser.hasNoPublications,
                languages: updatedUser.languages,
                interests: updatedUser.interests,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUserProfile
};
