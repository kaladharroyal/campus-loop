const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized' });
    }
};

// Get all assignments for logged in user (based on enrolled courses - simplified to all for demo)
router.get('/', protect, async (req, res) => {
    try {
        const assignments = await Assignment.find().populate('course', 'title');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
