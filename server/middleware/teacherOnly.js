// Middleware to restrict access to teachers only
const teacherOnly = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Teacher role required.'
        });
    }
};

module.exports = teacherOnly;
