// Middleware to check if the authenticated user has admin role
// This middleware should be used after the 'protect' middleware

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to the route handler
    } else {
        res.status(403).json({
            message: 'Access denied. Admin privileges required.'
        });
    }
};

module.exports = adminOnly;